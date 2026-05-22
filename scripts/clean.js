const fs = require('fs');
const path = require('path');

const distPath = path.join(__dirname, '..', 'dist');
if (fs.existsSync(distPath)) {
  fs.rmSync(distPath, { recursive: true, force: true });
  console.log('✓ Removed dist/');
}

function cleanDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      cleanDirectory(fullPath);
    } else if (entry.name.endsWith('.js') || entry.name.endsWith('.js.map')) {
      fs.unlinkSync(fullPath);
      console.log(`✓ Removed ${path.relative(process.cwd(), fullPath)}`);
    }
  }
}

const srcPath = path.join(__dirname, '..', 'src');
if (fs.existsSync(srcPath)) {
  cleanDirectory(srcPath);
  console.log('✓ Cleaned .js and .js.map files from src/');
}

console.log('\n✅ Clean complete!');
