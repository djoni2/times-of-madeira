const assert = require('assert');
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const root = path.join(__dirname, '..');
const outputDir = path.join(root, '_site');

execFileSync(process.execPath, [path.join(root, 'build.js')], { cwd: root, stdio: 'inherit' });

const requiredFiles = [
  path.join(outputDir, 'tag', 'society', 'index.html'),
  path.join(outputDir, 'tag', 'accident', 'index.html'),
  path.join(outputDir, 'tag', 'index.html')
];

for (const file of requiredFiles) {
  assert.ok(fs.existsSync(file), `Expected tag route to be generated: ${path.relative(root, file)}`);
}

const societyPage = fs.readFileSync(path.join(outputDir, 'tag', 'society', 'index.html'), 'utf8');
assert.ok(societyPage.includes('Check out the last'), 'Expected the society tag page to include the section heading.');
assert.ok(societyPage.includes('Tag Cloud'), 'Expected the society tag page to include the footer widget section.');

console.log('Tag route generation checks passed.');
