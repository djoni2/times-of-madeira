const assert = require('assert');
const path = require('path');
const fs = require('fs');
const vm = require('vm');

const scriptPath = path.join(__dirname, '..', 'script.js');
const scriptSource = fs.readFileSync(scriptPath, 'utf8');

const context = {
  console,
  window: { location: { search: '' } },
  location: { search: '' },
  document: {
    addEventListener() {},
    getElementById() { return null; },
    createElement() { return {}; },
    body: {}
  },
  supabase: {
    createClient: () => ({
      from: () => ({
        select: () => ({
          order: async () => ({ data: Array.from({ length: 12 }, (_, i) => ({ slug: `post-${i + 1}`, title: `Post ${i + 1}`, description: 'Desc' })), error: null })
        })
      })
    })
  }
};

context.global = context;
vm.createContext(context);
vm.runInContext(scriptSource, context);

const { getPaginatedPosts, getTotalPages, renderPagination } = context;
const posts = Array.from({ length: 12 }, (_, i) => ({ slug: `post-${i + 1}` }));

assert.strictEqual(getPaginatedPosts(posts, 1).length, 11, 'Page 1 should contain 11 posts.');
assert.strictEqual(getPaginatedPosts(posts, 2).length, 1, 'Page 2 should contain the remaining post.');
assert.strictEqual(getTotalPages(posts), 2, 'Total pages should be calculated correctly.');

const pager = { innerHTML: '' };
renderPagination(pager, 2, 1);
assert.ok(pager.innerHTML.includes('pagination__link'), 'Expected pagination markup to include page link classes.');

console.log('Pagination logic checks passed.');
