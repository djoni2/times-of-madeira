const fs = require('fs');
const path = require('path');

const root = __dirname;
const outputDir = path.join(root, '_site');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const filesToCopy = ['index.html', 'article.html', 'script.js', 'assets', 'styles', 'lang'];

for (const item of filesToCopy) {
  const source = path.join(root, item);
  const target = path.join(outputDir, item);

  if (!fs.existsSync(source)) continue;

  if (fs.statSync(source).isDirectory()) {
    copyDir(source, target);
  } else {
    fs.copyFileSync(source, target);
  }
}

function copyDir(source, target) {
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target, { recursive: true });
  }

  for (const entry of fs.readdirSync(source, { withFileTypes: true })) {
    const srcPath = path.join(source, entry.name);
    const destPath = path.join(target, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

console.log('Static site build complete in _site');
