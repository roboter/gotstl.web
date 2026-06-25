const fs = require('fs');
const path = require('path');
const http = require('http');
const puppeteer = require('puppeteer');

// Configurations
const EXAMPLES_SRC_DIR = path.join(__dirname, '..', 'src', 'assets', 'products');
const EXAMPLES_DIST_DIR = path.join(__dirname, '..', 'dist', 'gotstl', 'assets', 'products');
const DIST_DIR = path.join(__dirname, '..', 'dist', 'gotstl');
const DEFAULT_DEV_URL = 'http://localhost:4200';
const TEMP_SERVER_PORT = 8080;

/**
 * Checks if a server is running at the given URL
 */
function isServerRunning(url) {
  return new Promise((resolve) => {
    const { hostname, port, pathname } = new URL(url);
    const req = http.request(
      {
        hostname,
        port: port || 80,
        path: pathname || '/',
        method: 'HEAD',
        timeout: 1000,
      },
      (res) => {
        resolve(res.statusCode >= 200 && res.statusCode < 400);
      }
    );

    req.on('error', () => resolve(false));
    req.on('timeout', () => {
      req.destroy();
      resolve(false);
    });
    req.end();
  });
}

/**
 * Starts a simple HTTP static server serving the dist folder
 */
function startStaticServer(dir, port) {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(dir)) {
      return reject(new Error(`Distribution directory not found at: ${dir}. Please run 'npm run build' first.`));
    }

    const server = http.createServer((req, res) => {
      const parsedUrl = new URL(req.url, `http://localhost:${port}`);
      let pathname = parsedUrl.pathname;
      let filePath = path.join(dir, pathname);

      // SPA redirect: if directory, check for index.html
      if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
        filePath = path.join(filePath, 'index.html');
      }

      // If file doesn't exist, serve index.html (Angular routing fallback)
      if (!fs.existsSync(filePath)) {
        filePath = path.join(dir, 'index.html');
      }

      const ext = path.extname(filePath).toLowerCase();
      const mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.ico': 'image/x-icon',
        '.jscad': 'text/plain',
        '.stl': 'application/sla',
      };

      const contentType = mimeTypes[ext] || 'application/octet-stream';

      fs.readFile(filePath, (error, content) => {
        if (error) {
          res.writeHead(500);
          res.end(`Server Error: ${error.code}`);
        } else {
          res.writeHead(200, { 'Content-Type': contentType });
          res.end(content, 'utf-8');
        }
      });
    });

    server.listen(port, () => {
      console.log(`[Server] Temporary server running at http://localhost:${port}`);
      resolve(server);
    });

    server.on('error', (err) => {
      reject(err);
    });
  });
}

/**
 * Recursively gets all files with the given extension in a directory
 */
function getFilesRecursively(dir, ext) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFilesRecursively(fullPath, ext));
    } else if (file.endsWith(ext)) {
      results.push(fullPath);
    }
  });
  return results;
}

/**
 * Main function
 */
async function main() {
  const args = process.argv.slice(2);
  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
Usage: node scripts/generate-screenshots.js [options] [file1.jscad file2.jscad ...]

Options:
  -h, --help           Show this help message.
  --all                Force regenerate screenshots for all .jscad examples.
  --force              Overwrite existing screenshot pngs (default is to only generate missing ones).
  --static             Force rendering using the built static files under dist/gotstl.
  --verbose            Print verbose browser logs and network requests.
  --zoom-scale <val>   Add a zoom scaling factor to screenshots (e.g. 0.5 to render 50% smaller).
  --fit-to-view        Mathematically calculate the exact camera distance to fit the whole object into the frustum.

Examples:
  node scripts/generate-screenshots.js
  node scripts/generate-screenshots.js --force
  node scripts/generate-screenshots.js example001.jscad --fit-to-view
    `);
    process.exit(0);
  }

  const force = args.includes('--force');
  const forceStatic = args.includes('--static');
  const verbose = args.includes('--verbose');
  const fitToView = args.includes('--fit-to-view');

  // Parse --zoom-scale value (default: 1.0)
  let zoomScale = 1.0;
  const zoomIndex = args.indexOf('--zoom-scale');
  if (zoomIndex !== -1 && zoomIndex + 1 < args.length) {
    zoomScale = parseFloat(args[zoomIndex + 1]) || 1.0;
  }

  // Get filenames: filter out arguments that are flags or values for flags
  const fileNames = [];
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg.startsWith('-')) {
      if (arg === '--zoom-scale') {
        i++; // skip next argument which is the value
      }
      continue;
    }
    fileNames.push(arg);
  }

  const processAll = args.includes('--all') || !fileNames.length;

  // Collect target files
  let targetFiles = [];
  if (processAll) {
    targetFiles = getFilesRecursively(EXAMPLES_SRC_DIR, '.jscad');
  } else {
    fileNames.forEach(name => {
      let fullPath = path.join(EXAMPLES_SRC_DIR, name);
      if (!fs.existsSync(fullPath)) {
        // Try direct path
        fullPath = path.resolve(name);
      }
      if (fs.existsSync(fullPath) && fullPath.endsWith('.jscad')) {
        targetFiles.push(fullPath);
      } else {
        console.warn('[Warning] File not found or not a .jscad file:', name);
      }
    });
  }

  if (targetFiles.length === 0) {
    console.log('No .jscad files to process.');
    process.exit(0);
  }

  console.log(`Found ${targetFiles.length} target .jscad file(s) to process.`);

  // Determine base URL
  let baseUrl = DEFAULT_DEV_URL;
  let tempServer = null;

  const isDevRunning = forceStatic ? false : await isServerRunning(DEFAULT_DEV_URL);
  if (isDevRunning) {
    console.log(`[Status] Detected running dev server at ${DEFAULT_DEV_URL}. Using it.`);
  } else {
    console.log(`[Status] Dev server at ${DEFAULT_DEV_URL} is not running.`);
    console.log(`[Status] Starting temporary server from production build directory...`);
    try {
      tempServer = await startStaticServer(DIST_DIR, TEMP_SERVER_PORT);
      baseUrl = `http://localhost:${TEMP_SERVER_PORT}`;
    } catch (err) {
      console.error(`[Error] Could not start server: ${err.message}`);
      console.error(`[Tip] Make sure the app is built by running: npm run build`);
      process.exit(1);
    }
  }

  // Launch Puppeteer
  console.log('[Puppeteer] Launching headless browser...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox'
    ]
  });

  const page = await browser.newPage();

  // Log page console messages
  page.on('console', msg => {
    if (verbose) {
      console.log(`[Browser Console] ${msg.type().toUpperCase()}: ${msg.text()}`);
    }
  });

  // Log page errors
  page.on('pageerror', err => {
    console.error(`[Browser PageError] ${err.toString()}`);
  });

  // Log request failures
  page.on('requestfailed', request => {
    if (verbose) {
      console.error(`[Browser RequestFailed] URL: ${request.url()} - ${request.failure()?.errorText || 'Unknown Error'}`);
    }
  });

  // Log bad responses
  page.on('response', response => {
    if (response.status() >= 400 && verbose) {
      console.error(`[Browser ResponseError] URL: ${response.url()} - Status: ${response.status()}`);
    }
  });

  page.on('console', msg => {
    console.log(`[Browser Console] ${msg.type().toUpperCase()}: ${msg.text()}`);
  });

  // Set a large viewport for high-quality screenshots
  await page.setViewport({ width: 1024, height: 768 });

  // Force all WebGL contexts to preserve their drawing buffer so Puppeteer can reliably screenshot them
  await page.evaluateOnNewDocument(() => {
    const originalGetContext = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (type, attributes) {
      if (type === 'webgl' || type === 'experimental-webgl' || type === 'webgl2') {
        attributes = attributes || {};
        attributes.preserveDrawingBuffer = true;
      }
      return originalGetContext.call(this, type, attributes);
    };
  });

  try {
    for (let i = 0; i < targetFiles.length; i++) {
      const filePath = targetFiles[i];
      const relativePath = path.relative(EXAMPLES_SRC_DIR, filePath);
      const baseName = relativePath.slice(0, -path.extname(relativePath).length);
      const outputPngName = `${baseName}.png`;
      const outputPngPath = path.join(EXAMPLES_SRC_DIR, outputPngName);

      // Check if file exists and we are not forcing regeneration
      if (fs.existsSync(outputPngPath) && !force && processAll) {
        console.log(`[Skip] Screenshot already exists for: ${relativePath} (use --force to overwrite)`);
        continue;
      }

      console.log(`[Process] [${i + 1}/${targetFiles.length}] Rendering: ${relativePath}...`);

      // Construct URL to open the specific jscad file
      // We pass the file path relative to assets and the zoomScale parameter
      const fileParam = `assets/products/${relativePath.replace(/\\/g, '/')}`;
      let url = `${baseUrl}/product/0?file=${encodeURIComponent(fileParam)}&screenshot=true&zoomScale=${zoomScale}`;
      if (fitToView) {
        url += '&fitToView=true';
      }

      try {
        await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });

        // Wait for screenshot element to appear (which is appended when screenshot is ready)
        console.log('  Waiting for WebGL rendering and screenshot trigger...');
        await page.waitForSelector('#screenshot-ready-flag', { timeout: 45000 });
        
        // Short additional delay to guarantee compositor has drawn the frame
        await new Promise(r => setTimeout(r, 2000));

        // Use Puppeteer's native screenshot ability to capture the canvas directly
        const canvasElement = await page.$('#viewerContext canvas');
        if (!canvasElement) {
          throw new Error('Canvas element not found on page.');
        }

        // Ensure directory exists
        const destDir = path.dirname(outputPngPath);
        if (!fs.existsSync(destDir)) {
          fs.mkdirSync(destDir, { recursive: true });
        }

        await canvasElement.screenshot({ path: outputPngPath });
        console.log(`  [Success] Saved screenshot to: src/assets/products/${outputPngName}`);

        // If dist directory exists, save to dist folder as well so server updates immediately
        if (fs.existsSync(DIST_DIR)) {
          const distPngPath = path.join(EXAMPLES_DIST_DIR, outputPngName);
          const distDestDir = path.dirname(distPngPath);
          if (!fs.existsSync(distDestDir)) {
            fs.mkdirSync(distDestDir, { recursive: true });
          }
          fs.copyFileSync(outputPngPath, distPngPath);
          console.log(`  [Success] Saved screenshot to: dist/gotstl/assets/products/${outputPngName}`);
        }
      } catch (err) {
        console.error(`  [Failed] Error rendering ${relativePath}: ${err.message}`);
      }
    }
  } finally {
    console.log('[Puppeteer] Closing browser...');
    if (browser) {
      browser.close().catch(() => {});
    }

    if (tempServer) {
      console.log('[Server] Stopping temporary server...');
      tempServer.close();
    }
    console.log('[Finished] Screenshot generation completed.');
    process.exit(0);
  }
}

main().catch((err) => {
  console.error('[Fatal Error]', err);
  process.exit(1);
});
