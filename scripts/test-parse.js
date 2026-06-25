const fs = require('fs');
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

console.log(parseHeader('src/assets/products/celtic-knot-ring.jscad'));
