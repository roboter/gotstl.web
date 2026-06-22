const http = require('http');
const productData = require('./shared/product-data');

const server = http.createServer((req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Handle request for /api/products
  if ((req.url === '/api/products' || req.url === '/api/products/' || req.url.startsWith('/api/products')) && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(productData.getProducts()));
    return;
  }

  // Handle request for /api/hero/:id
  if (req.url.startsWith('/api/hero/') && req.method === 'GET') {
    const id = req.url.split('/').pop();
    const product = productData.getProduct(id);
    if (product) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(product));
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Product not found');
    }
    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not Found');
});

const PORT = 7071;
server.listen(PORT, () => {
  console.log(`Mock API Server running at http://localhost:${PORT}`);
});
