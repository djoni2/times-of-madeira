const SUPABASE_URL = "https://rbfhbcsgjsypuzzgcbpo.supabase.co";
const SUPABASE_KEY = "sb_publishable_rV4oivvNDiHh_O_2TLKAQQ_I29j5muX";
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
const POSTS_PER_PAGE = 11;

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getTotalPages(posts) {
  return Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE));
}

function getPaginatedPosts(posts, page) {
  const safePage = Math.max(1, Number(page) || 1);
  const startIndex = (safePage - 1) * POSTS_PER_PAGE;
  return posts.slice(startIndex, startIndex + POSTS_PER_PAGE);
}

function renderPagination(container, totalPages, currentPage) {
  if (!container) return;

  const buttons = [];
  for (let page = 1; page <= totalPages; page += 1) {
    const isActive = page === currentPage;
    buttons.push(`
      <a class="pagination__link${isActive ? ' active' : ''}" href="?page=${page}">${page}</a>
    `);
  }

  container.innerHTML = `
    <div class="pagination__list">
      ${buttons.join('')}
    </div>`;
}

function renderFeed(posts, page) {
  const grid = document.getElementById('news-grid') || document.getElementById('posts-container');
  const pager = document.getElementById('pagination');
  if (!grid) return;

  if (!posts.length) {
    grid.innerHTML = '<div class="col col-12"><p class="loading">No stories are available at the moment.</p></div>';
    if (pager) pager.innerHTML = '';
    return;
  }

  const currentPage = Math.max(1, Number(page) || 1);
  const totalPages = getTotalPages(posts);
  const visiblePosts = getPaginatedPosts(posts, currentPage);

  const html = visiblePosts
    .map((post, index) => {
      const isFeatured = index === 0 && currentPage === 1;
      const cardClass = isFeatured
        ? 'article col col-6 col-w-4 col-d-6 col-t-12 article--big'
        : 'article col col-3 col-w-4 col-d-6 col-t-12';

      return `
        <div class="${cardClass}">
          <a class="article__image" href="article.html?post=${encodeURIComponent(post.slug)}" aria-label="${escapeHtml(post.title)}">
            <span class="featured">${isFeatured ? 'IN FOCUS' : 'LATEST'}</span>
          </a>
          <div class="article__inner">
            <div class="article__content">
              <div class="article__meta">
                <div class="article__tags">
                  <a class="article__tag" href="/">Madeira</a>
                </div>
                <time class="article__date">Latest</time>
              </div>
              <h2 class="article__title">
                <a href="article.html?post=${encodeURIComponent(post.slug)}">${escapeHtml(post.title)}</a>
              </h2>
              <p class="article__description">${escapeHtml(post.description || 'Read the full story from Madeira.')}</p>
            </div>
          </div>
        </div>`;
    })
    .join('');

  grid.innerHTML = html;
  if (pager) {
    renderPagination(pager, totalPages, currentPage);
  }
}

async function fetchFeed() {
  try {
    const { data, error } = await supabaseClient
      .from('posts')
      .select('title, slug, description')
      .order('id', { ascending: false });

    if (error) {
      console.error('Supabase Error:', error);
      return;
    }

    const posts = Array.isArray(data) ? data : [];
    const params = new URLSearchParams(window.location.search || '');
    const page = params.get('page') || '1';
    renderFeed(posts, page);
  } catch (err) {
    console.error(err);
  }
}

if (typeof module !== 'undefined') {
  module.exports = { getTotalPages, getPaginatedPosts, POSTS_PER_PAGE };
}

document.addEventListener('DOMContentLoaded', fetchFeed);
