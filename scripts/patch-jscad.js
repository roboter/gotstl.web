const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, '..', 'node_modules', '@jwc', 'jscad-web', 'dist', 'openjscad.umd.js');

if (fs.existsSync(targetFile)) {
  let content = fs.readFileSync(targetFile, 'utf8');
  // Clean up previous patch if it only exposed viewer
  if (content.includes('viewer: gProcessor.viewer,') && !content.includes('processor: gProcessor,')) {
    content = content.replace('viewer: gProcessor.viewer,\n', '');
  }

  if (content.includes('resetCamera: function resetCamera() {') && !content.includes('processor: gProcessor,')) {
    content = content.replace(
      'resetCamera: function resetCamera() {',
      'viewer: gProcessor.viewer,\n    processor: gProcessor,\n    resetCamera: function resetCamera() {'
    );
    fs.writeFileSync(targetFile, content, 'utf8');
    console.log('[Patch] Successfully exposed viewer and processor properties on @jwc/jscad-web bundle.');
  } else {
    console.log('[Patch] @jwc/jscad-web already patched or resetCamera signature not found.');
  }
} else {
  console.log('[Patch] Target @jwc/jscad-web bundle not found.');
}
