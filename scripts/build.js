#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔨 Building azure-msal-auth-schematic...\n');

try {
  // Clean dist folder
  console.log('🧹 Cleaning dist folder...');
  if (fs.existsSync('dist')) {
    fs.rmSync('dist', { recursive: true, force: true });
  }

  // Compile TypeScript
  console.log('📦 Compiling TypeScript...');
  execSync('tsc -p tsconfig.json', { stdio: 'inherit' });

  // Copy collection.json
  console.log('📋 Copying collection.json...');
  fs.copyFileSync(
    path.join('src', 'collection.json'),
    path.join('dist', 'collection.json')
  );

  // Copy schema.json
  console.log('📋 Copying schema.json...');
  const distSchemaDir = path.join('dist', 'azure-auth-schematic');
  fs.mkdirSync(distSchemaDir, { recursive: true });
  fs.copyFileSync(
    path.join('src', 'azure-auth-schematic', 'schema.json'),
    path.join(distSchemaDir, 'schema.json')
  );

  // Copy template files
  console.log('📂 Copying template files...');
  copyRecursiveSync(
    path.join('src', 'azure-auth-schematic', 'files'),
    path.join('dist', 'azure-auth-schematic', 'files')
  );

  // Copy docs
  console.log('📄 Copying documentation...');
  ['README.md', 'LICENSE'].forEach(doc => {
    if (fs.existsSync(doc)) {
      fs.copyFileSync(doc, path.join('dist', doc));
    }
  });

  // Write dist/package.json (cleaned up for publishing)
  console.log('📦 Writing dist/package.json...');
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
  delete packageJson.scripts;
  delete packageJson.devDependencies;
  packageJson.schematics = './collection.json';
  fs.writeFileSync(
    path.join('dist', 'package.json'),
    JSON.stringify(packageJson, null, 2)
  );

  console.log('\n✅ Build completed successfully!');
  console.log('📦 Output: dist/');
  console.log('🚀 Ready to publish with: npm publish dist --access public\n');
} catch (error) {
  console.error('\n❌ Build failed:', error.message);
  process.exit(1);
}

function copyRecursiveSync(src, dest) {
  if (!fs.existsSync(src)) return;

  const stats = fs.statSync(src);
  if (stats.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    fs.readdirSync(src).forEach(child =>
      copyRecursiveSync(path.join(src, child), path.join(dest, child))
    );
  } else if (!src.endsWith('_spec.ts') && !src.endsWith('_spec.js')) {
    fs.copyFileSync(src, dest);
  }
}
