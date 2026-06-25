const fs = require('fs');
const path = require('path');

const PRODUCTS_DIR = path.join(__dirname, '../src/assets/products');
const PRODUCT_DATA_FILE = path.join(__dirname, '../api/shared/product-data.js');

// Helper to recursively find .jscad files
function findJscadFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      findJscadFiles(filePath, fileList);
    } else if (file.endsWith('.jscad')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

// Parse header comments
function parseHeader(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const metadata = {};
  
  for (const line of lines) {
    if (!line.startsWith('//')) {
      if (line.trim() !== '') break; // Stop at first code line
      continue;
    }
    
    const match = line.match(/^\/\/\s*([a-zA-Z_-]+)\s*:\s*(.+)$/);
    if (match) {
      const key = match[1].trim().toLowerCase();
      const value = match[2].trim();
      metadata[key] = value;
    }
  }
  return metadata;
}

const allJscadFiles = findJscadFiles(PRODUCTS_DIR);
const extractedData = allJscadFiles.map(filePath => {
  const meta = parseHeader(filePath);
  const relativePath = path.relative(path.join(__dirname, '../src'), filePath).replace(/\\/g, '/');
  
  const parsed = {
    file: relativePath,
    image: relativePath.replace(/\.jscad$/, '.png'),
  };
  
  if (meta.title || meta.name) parsed.name = meta.title || meta.name;
  else parsed.name = path.basename(filePath, '.jscad');
  
  if (meta.description) parsed.description = meta.description;
  if (meta.author) parsed.author = meta.author;
  if (meta.license) parsed.license = meta.license;
  if (meta.url) parsed.url = meta.url;
  
  if (meta.tags) {
    parsed.tags = meta.tags.split(',').map(t => t.trim()).filter(t => t);
  }
  
  return parsed;
});

// Now we need to read the existing product-data.js and safely replace the products array
const productDataContent = fs.readFileSync(PRODUCT_DATA_FILE, 'utf8');

// Use regex or eval to get existing data (using eval since it's just a local data file)
// We need to inject 'module = {};' to capture exports
const sandbox = { module: {} };
const script = productDataContent.replace('const data = {', 'sandbox.data = {');
eval(script);

const existingProducts = sandbox.data.products;
let nextId = Math.max(...existingProducts.map(p => p.id)) + 10;
if (nextId < 10) nextId = 10;

const newProductsMap = new Map();

// Initialize with existing products
existingProducts.forEach(p => newProductsMap.set(p.file, { ...p }));

// Merge new extracted data
extractedData.forEach(extracted => {
  if (newProductsMap.has(extracted.file)) {
    const existing = newProductsMap.get(extracted.file);
    // Overwrite with extracted metadata, but keep existing manual edits if extracted is missing
    Object.keys(extracted).forEach(key => {
      if (extracted[key] !== undefined) {
        existing[key] = extracted[key];
      }
    });
  } else {
    extracted.id = nextId;
    nextId += 10;
    newProductsMap.set(extracted.file, extracted);
  }
});

const finalProductsList = Array.from(newProductsMap.values());
// Sort by id for consistency
finalProductsList.sort((a, b) => a.id - b.id);

// Generate new JS content
const beforeData = productDataContent.substring(0, productDataContent.indexOf('const data = {'));
const afterDataMatch = productDataContent.match(/};\s*\n+const getRandomInt/);
const afterDataIdx = afterDataMatch ? afterDataMatch.index + 2 : productDataContent.indexOf('const getRandomInt');

const newDataString = `const data = {
  products: ${JSON.stringify(finalProductsList, null, 4)}
};`;

// Replace \" in stringified output to keep it somewhat clean (though JSON uses double quotes, which is fine)

const newFileContent = beforeData + newDataString + '\n\n' + productDataContent.substring(afterDataIdx);

fs.writeFileSync(PRODUCT_DATA_FILE, newFileContent);
console.log(`Updated product-data.js with ${finalProductsList.length} products.`);

