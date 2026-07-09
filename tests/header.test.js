const assert = require('assert');
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const root = path.join(__dirname, '..');
const outputDir = path.join(root, '_site');

execFileSync(process.execPath, [path.join(root, 'build.js')], { cwd: root, stdio: 'inherit' });

const homepage = fs.readFileSync(path.join(outputDir, 'index.html'), 'utf8');
assert.ok(homepage.includes('class="header"'), 'Expected the homepage to include the header wrapper.');
assert.ok(homepage.includes('href="/tag/society/"'), 'Expected the homepage header to include the Society link.');
assert.ok(homepage.includes('href="https://x.com/timesofmadeira"'), 'Expected the homepage header to include the X social link.');
assert.ok(homepage.includes('class="hamburger"'), 'Expected the homepage header to include the hamburger trigger.');

console.log('Header markup checks passed.');
