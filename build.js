const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const root = __dirname;
const outputDir = path.join(root, '_site');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const scssEntry = path.join(root, 'styles', 'index.scss');
const cssOutput = path.join(outputDir, 'styles', 'site.css');
fs.mkdirSync(path.dirname(cssOutput), { recursive: true });
execSync(`npx sass "${scssEntry}" "${cssOutput}"`, { stdio: 'inherit' });

const filesToCopy = ['index.html', 'article.html', 'script.js', 'assets', 'lang'];

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

const tags = [
  { name: 'Accident', slug: 'accident', description: 'On average, Madeira sees about one fatal accident per month. Stay informed about incidents across the island, from road collisions to other emergencies, and receive timely updates on accidents, critical situations, and emergency responses.', count: 41 },
  { name: 'Culture', slug: 'culture', description: 'In-depth look at Madeira’s heritage, traditions, and community life. Covering major events, milestones, and customs, it highlights the island’s rich cultural identity, offering insights into social and political influences that shape Madeira.', count: 105 },
  { name: 'Politics', slug: 'politics', description: 'Stay informed about the latest developments in Madeira\'s political landscape. Get breaking news on regional government decisions, political party activities, demonstrations, new legislations, and laws impacting the island.', count: 200 },
  { name: 'Ukraine', slug: 'ukraine', description: '', count: 17 },
  { name: 'Praia Formosa', slug: 'praia-formosa', description: 'Praia Formosa translates to "Beautiful beach", and it is more than that. Funchal\'s beloved pebble beach is Funchal´s most picturesque coastline but also serves as a vibrant gathering spot for countless tourists year after year.', count: 14 },
  { name: 'Rescue', slug: 'rescue', description: '', count: 66 },
  { name: 'Weather Forecast', slug: 'weather-forecast', description: '', count: 36 },
  { name: 'Câmara de Lobos', slug: 'camara-de-lobos', description: 'With more than 40.000 inhabitants, Câmara de Lobos is the second largest city in Madeira. Stay up to date and get the latest news on local incidents, community events, and societal developments shaping the Funchal\'s neighboring city.', count: 42 },
  { name: 'History', slug: 'history', description: 'From discovery in 1419 to the 1974 Revolution, explore Madeira’s journey through the White Gold sugar boom, the legend of Columbus, and the heritage of Madeira Wine. Trace a story of wartime strategy, global immigration, and the path to autonomy.', count: 40 },
  { name: 'Crime', slug: 'crime', description: 'While Madeira is renowned for its safety, evolving dynamics have led to a rise in crime over the years. Keep informed of the latest developments in Madeira\'s crime scene with up-to-date news coverage.', count: 91 },
  { name: 'Ronaldo', slug: 'ronaldo', description: 'Cristiano Ronaldo, or CR7, is considered a half-god in Madeira. It\'s the island\'s favorite son. Stay informed about his records, his visits to Madeira, and news on the personal and professional life of one of the greatest football players in the world!', count: 20 },
  { name: 'Nature', slug: 'nature', description: '', count: 115 },
  { name: 'Police Investigation', slug: 'police-investigation', description: '', count: 16 },
  { name: 'Reform', slug: 'reform', description: '', count: 114 },
  { name: 'Sao Vicente', slug: 'sao-vicente', description: '', count: 6 },
  { name: 'Economy', slug: 'economy', description: 'Get the latest updates on Madeira’s economic landscape, covering key sectors like tourism, retail, real estate, and local industry. Follow news on business developments, investment initiatives, and policies shaping the island’s financial trends.', count: 156 },
  { name: 'Mortgage', slug: 'mortgage', description: '', count: 9 },
  { name: 'Education', slug: 'education', description: '', count: 19 },
  { name: 'Social Housing', slug: 'social-housing', description: '', count: 3 },
  { name: 'Employment', slug: 'employment', description: '', count: 57 },
  { name: 'Gastronomy', slug: 'gastronomy', description: '', count: 16 },
  { name: 'Christmas', slug: 'christmas', description: '', count: 17 },
  { name: 'Hiking', slug: 'hiking', description: '', count: 34 },
  { name: 'Alojamento Local', slug: 'alojamento-local', description: '', count: 4 },
  { name: 'Public Transport', slug: 'public-transport', description: 'Stay informed about public transport in Madeira. Find the latest news on bus schedules, routes, and service updates. Learn about new initiatives for sustainable mobility. Discover convenient ways to explore Madeira using buses, taxis, or cable cars.', count: 58 },
  { name: 'Record', slug: 'record', description: '', count: 36 },
  { name: 'Porto Santo', slug: 'porto-santo', description: '', count: 23 },
  { name: 'CO2 emission', slug: 'co2-emission', description: '', count: 3 },
  { name: 'Future', slug: 'future', description: '', count: 44 },
  { name: 'Climate transition', slug: 'climate-transition', description: '', count: 23 },
  { name: 'Tourism', slug: 'tourism', description: 'With a resident population of around 257,000, Madeira welcomes over 2 million tourists annually, accounting for more than 10 million overnight stays. Stay informed about the island\'s tourism scene with the latest news!', count: 229 },
  { name: 'Real Estate', slug: 'real-estate', description: 'Madeira has seen crucial changes in the real estate market. Property prices and rentals went through the roof and many are finding it increasingly difficult to find housing. Stay ahead with the latest property & real estate news on Madeira Island.', count: 91 },
  { name: 'Society', slug: 'society', description: 'Stay informed on Madeira’s social landscape, from public safety and healthcare challenges to housing trends and community issues. This covers local events, policies, and stories affecting residents’ daily lives, highlighting the human impact behind news.', count: 241 },
  { name: 'Traffic', slug: 'traffic', description: 'Throughout the last decades, traffic has been increasing steadily in Madeira. Stay up-to-date on the latest road incidents. Get breaking news on traffic jams, rental cars, road closures, and incidents regarding public transportation.', count: 88 },
  { name: 'Natural disaster', slug: 'natural-disaster', description: '', count: 19 },
  { name: 'NATO', slug: 'nato', description: '', count: 14 },
  { name: 'Airport', slug: 'airport', description: 'Find the latest news about Cristiano Ronaldo International Airport (FNC). Get insights on tourist arrivals, new flight routes, and airlines. Dive into statistics, witness skillfull landings and takeoffs, and stay informed about airport incidents.', count: 83 },
  { name: 'Funchal', slug: 'funchal', description: 'Experience Funchal\'s heartbeat with our breaking news coverage. Stay informed on politics, events, and the dynamic core of Madeira\'s capital. Find concise updates, keeping you at the forefront of everything that goes on in the capital of Madeira.', count: 181 }
];

const tagIndexPath = path.join(outputDir, 'tag', 'index.html');
fs.mkdirSync(path.dirname(tagIndexPath), { recursive: true });
fs.writeFileSync(tagIndexPath, renderTagIndex(tags));

for (const tag of tags) {
  const dir = path.join(outputDir, 'tag', tag.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), renderTagPage(tag));
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

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getTagPosts(tag) {
  const postsByTag = {
    accident: [
      { title: '25-Year-Old Woman Dies in Car Accident in Funchal', description: 'After being transported to Nélio Mendonça Hospital, a 25-year-old woman was pronounced dead following yesterday’s car accident in Nazaré, Funchal.', tags: ['Accident', 'Funchal'], date: 'Jan 13, 2026', author: 'Mat', featured: false },
      { title: 'First Fatal Road Accident of 2026 Claims Life of Man', description: 'Madeira’s first fatal road accident of 2026 occurred in Ribeira Brava when a man died after his car fell down a steep slope.', tags: ['Traffic', 'Accident'], date: 'Jan 5, 2026', author: 'Mat', featured: true },
      { title: 'Drunk Driving: CDS Councillor Injures Man and Loses Mandate', description: 'It is a familiar story in Madeira: driving under the influence. This time, a severely intoxicated public official struck a man who was taken to the hospital.', tags: ['Accident', 'Society'], date: 'Jan 2, 2026', author: 'Mat', featured: false }
    ],
    society: [
      { title: 'Where to Donate Clothes in Funchal?', description: 'Got clothes you no longer wear? Have some used clothing in good condition that deserves a second life? Put the meaning back in the fabric and donate!', tags: ['Society', 'Funchal'], date: 'May 2, 2025', author: 'Mat', featured: true },
      { title: 'Only 2 Out of 1,200 Pestana Employees Strike for Higher Wages', description: 'Only 2 of 1,200 Pestana employees all over Madeira decided to join the strike for better wages. Why is that?', tags: ['Society', 'Employment'], date: 'Dec 30, 2024', author: 'Mat', featured: false },
      { title: 'Dermatology Waiting List in Madeira Reaches 3,000 People', description: 'Around 3,000 people are waiting for dermatology consultations in Madeira, as SESARAM warns of rising skin cancer cases and growing melanoma diagnoses among younger adults.', tags: ['Society', 'Politics'], date: 'May 19, 2026', author: 'Mat', featured: false }
    ],
    politics: [
      { title: 'Chega Madeira Leaders Sued for Inciting Hate Against Muslims', description: 'After repeated attacks, the Islamic Center of Madeira is turning to the rule of law against what the Commission for Religious Freedom condemned as defamation.', tags: ['Politics', 'Society'], date: 'Apr 30, 2026', author: 'Mat', featured: true },
      { title: 'António José Seguro Leading Presidential Election', description: 'António José Seguro is projected to win the first round of the presidential election and is expected to face André Ventura in a second-round contest.', tags: ['Politics', 'Society'], date: 'Jan 18, 2026', author: 'Mat', featured: false }
    ]
  };

  return postsByTag[tag.slug] || [
    { title: `Latest updates about ${tag.name}`, description: `Read the most recent reporting about ${tag.name.toLowerCase()} on Times of Madeira.`, tags: [tag.name], date: 'Today', author: 'Mat', featured: true },
    { title: `More context on ${tag.name}`, description: `Explore the broader background and latest developments related to ${tag.name.toLowerCase()}.`, tags: [tag.name], date: 'Today', author: 'Mat', featured: false },
    { title: `What changed in ${tag.name}`, description: `Follow the latest developments and understand the story behind the headlines.`, tags: [tag.name], date: 'Today', author: 'Mat', featured: false }
  ];
}

function renderArticleCard(post, isFeatured, tagSlug) {
  const className = isFeatured
    ? 'article col col-6 col-w-4 col-d-6 col-t-12 article--big'
    : 'article col col-3 col-w-4 col-d-6 col-t-12';

  const tagsMarkup = (post.tags || []).map((tagName) => `<a class="article__tag" href="/tag/${encodeURIComponent(tagName.toLowerCase().replace(/\s+/g, '-'))}/">${escapeHtml(tagName)}</a>`).join('');
  const authorMarkup = post.author
    ? `<div class="article__authors"><div class="article__author"><a href="/" class="article__author__link">${escapeHtml(post.author)}</a></div></div>`
    : '';

  return `
    <div class="${className}">
      <a href="/article.html?post=${encodeURIComponent(post.slug || tagSlug)}" class="article__image" aria-label="${escapeHtml(post.title)}"></a>
      <div class="article__inner">
        <div class="article__content">
          <div class="article__meta">
            <div class="article__tags">${tagsMarkup}</div>
            <time class="article__date" datetime="${escapeHtml(post.date || '')}">${escapeHtml(post.date || 'Today')}</time>
          </div>
          <h2 class="article__title">
            <a href="/article.html?post=${encodeURIComponent(post.slug || tagSlug)}">${escapeHtml(post.title)}</a>
          </h2>
          <p class="article__description">${escapeHtml(post.description)}</p>
          ${authorMarkup}
        </div>
      </div>
    </div>`;
}

function renderTagPage(tag) {
  const description = tag.description ? `<div class="tag-description">${escapeHtml(tag.description)}</div>` : '';
  const posts = getTagPosts(tag);
  const cardsMarkup = posts.map((post, index) => renderArticleCard(post, index === 0, tag.slug)).join('');

  return `<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(tag.name)} | Times of Madeira</title>
    <meta name="description" content="${escapeHtml(tag.description || `${tag.name} posts on Times of Madeira.`)}" />
    <link rel="stylesheet" href="/styles/site.css" />
  </head>
  <body>
    <header class="header">
      <div class="container-big">
        <div class="row">
          <div class="header__inner col col-12">
            <div class="footer__social" aria-label="Social links">
              <a class="social-link" href="https://x.com/timesofmadeira" title="Twitter">Twitter</a>
              <a class="social-link" href="https://www.facebook.com/timesofmadeira" title="Facebook">Facebook</a>
              <a class="social-link" href="https://www.instagram.com/timesofmadeira/" title="Instagram">Instagram</a>
            </div>

            <div class="logo" aria-label="Times of Madeira">
              <a class="logo__link" href="/">
                <img class="logo__image" src="/assets/times-of-madeira-logo.svg" alt="Times of Madeira" />
              </a>
            </div>

            <div class="hamburger" id="hamburger" onclick="document.getElementById('menuList').classList.toggle('is-visible'); this.classList.toggle('is-open')">
              <div></div>
            </div>

            <nav class="main-nav" aria-label="Main menu" id="menuList">
              <div class="main-nav__box">
                <ul class="nav__list list-reset">
                  <li class="nav__item"><a class="nav__link" href="/">Home</a></li>
                  <li class="nav__item"><a class="nav__link" href="/tag/society/">Society</a></li>
                  <li class="nav__item"><a class="nav__link" href="/tag/tourism/">Tourism</a></li>
                  <li class="nav__item"><a class="nav__link" href="/tag/politics/">Politics</a></li>
                  <li class="nav__item"><a class="nav__link" href="/tag/funchal/">Funchal</a></li>
                  <li class="nav__item"><a class="nav__link" href="/tag/economy/">Economy</a></li>
                </ul>
              </div>

              <div class="nav-button">
                <div class="nav-search">
                  <a class="nav-search-button" href="/tag/" aria-label="Search tags"><i aria-hidden="true">⌕</i></a>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>

    <main role="main" class="tag-page">
      <section class="hero">
        <div class="container">
          <div class="row">
            <div class="col col-12">
              <div class="hero__inner">
                <div><a href="/" title="Times of Madeira"><img class="hero__logo" src="/assets/times-of-madeira-logo.svg" alt="Times of Madeira" /></a></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div class="container">
        <div class="row">
          <div class="col col-12">
            <section class="tag-head">
              <h1 class="tag-title">${escapeHtml(tag.name)}</h1>
              ${description}
            </section>
          </div>
        </div>
      </div>

      <div class="container">
        <div class="section-title">Check out the last <span>${tag.count} Posts</span></div>
        <div class="row">${cardsMarkup}</div>
      </div>

      <nav class="pagination" aria-label="Pagination">
        <div class="container">
          <div class="pagination__list">
            <a class="pagination__prev disabled" href="/tag/${tag.slug}/">Prev</a>
            <span class="pagination__count">Page 1 of 4</span>
            <a class="pagination__next" href="/tag/${tag.slug}/page/2">Next</a>
          </div>
        </div>
      </nav>
    </main>

    <div class="search-wrapper">
      <div class="container">
        <div class="row">
          <div class="col col-12">
            <div class="search">
              <form class="search-form">
                <i aria-hidden="true" class="search-input-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="16" height="16" fill="currentColor" style="vertical-align:middle"><path d="M456.69 421.39L362.6 327.3a173.81 173.81 0 0034.84-104.58C397.44 126.38 319.06 48 222.72 48S48 126.38 48 222.72s78.38 174.72 174.72 174.72A173.81 173.81 0 00327.3 362.6l94.09 94.09a25 25 0 0035.3-35.3zM97.92 222.72a124.8 124.8 0 11124.8 124.8 124.95 124.95 0 01-124.8-124.8z"/></svg>
                </i>
                <input class="search-field" type="text" placeholder="Search article" />
              </form>
              <div class="popular-wrapper">
                <h4 class="popular-title">Topics</h4>
                <span class="popular-tags post-tags">
                  <a href="/tag/society/">Society</a>
                  <a href="/tag/tourism/">Tourism</a>
                  <a href="/tag/politics/">Politics</a>
                  <a href="/tag/funchal/">Funchal</a>
                  <a href="/tag/economy/">Economy</a>
                  <a href="/tag/nature/">Nature</a>
                  <a href="/tag/reform/">Reform</a>
                  <a href="/tag/culture/">Culture</a>
                  <a href="/tag/crime/">Crime</a>
                  <a href="/tag/real-estate/">Real Estate</a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <section class="footer-widgets">
      <div class="container">
        <div class="row">
          <div class="col col-12">
            <div class="widget-box">
              <div class="row">
                <div class="col col-4 col-d-6 col-t-12">
                  <div class="widget widget-authors">
                    <div class="widget__head">
                      <h3 class="widget__title">Meet our authors</h3>
                      <div class="authors">
                        <div class="authors__inner">
                          <a href="/" class="author__image"><img src="/assets/times-of-madeira-logo.svg" alt="Mat" /></a>
                        </div>
                        <div class="author__name"><a href="/" class="author__link">Mat</a></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col col-4 col-d-6 col-t-12">
                  <div class="widget widget-recent">
                    <div class="widget__head">
                      <h3 class="widget__title">Recent Posts</h3>
                    </div>
                    <div class="recent-post">
                      <div class="recent-post__content">
                        <time class="recent-post__date">May 20, 2026</time>
                        <h4 class="recent-post__title"><a href="/article.html?post=latest">Lisbon Court Finds Strong Indications of Corruption in Madeira Case</a></h4>
                      </div>
                    </div>
                    <div class="recent-post">
                      <div class="recent-post__content">
                        <time class="recent-post__date">May 19, 2026</time>
                        <h4 class="recent-post__title"><a href="/article.html?post=latest">DW Video Covers Tourism Pressures in Madeira</a></h4>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col col-4 col-d-6 col-t-12">
                  <div class="widget widget-tags">
                    <div class="widget__head">
                      <h4 class="widget__title">Tag Cloud</h4>
                    </div>
                    <div class="tag-cloud">
                      <a href="/tag/society/" class="tag-cloud__tag">Society</a>
                      <a href="/tag/tourism/" class="tag-cloud__tag">Tourism</a>
                      <a href="/tag/politics/" class="tag-cloud__tag">Politics</a>
                      <a href="/tag/funchal/" class="tag-cloud__tag">Funchal</a>
                      <a href="/tag/economy/" class="tag-cloud__tag">Economy</a>
                      <a href="/tag/culture/" class="tag-cloud__tag">Culture</a>
                      <a href="/tag/accident/" class="tag-cloud__tag">Accident</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <footer class="footer">
      <div class="container">
        <div class="row">
          <div class="col col-12">
            <div class="footer__inner">
              <div class="footer__info">
                <nav class="footer__nav">
                  <a class="footer__nav__link" href="/privacy">Privacy Policy</a>
                  <a class="footer__nav__link" href="https://linktr.ee/timesofmadeira">Linktree</a>
                </nav>
                <div class="footer__social">
                  <a class="social-link" href="https://x.com/timesofmadeira" title="Twitter">Twitter</a>
                  <a class="social-link" href="https://www.facebook.com/timesofmadeira" title="Facebook">Facebook</a>
                  <a class="social-link" href="https://www.instagram.com/timesofmadeira/" title="Instagram">Instagram</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </body>
</html>`;
}

function renderTagIndex(tags) {
  const rows = tags.map((tag) => `
    <li class="tag-index-item">
      <a class="tag-index-link" href="/tag/${tag.slug}/">${escapeHtml(tag.name)}</a>
      <span class="tag-index-count">${tag.count}</span>
    </li>`).join('');

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Tags | Times of Madeira</title>
    <meta name="description" content="Browse all tags on Times of Madeira." />
    <link rel="stylesheet" href="/styles/site.css" />
  </head>
  <body>
    <header class="header">
      <div class="container-big">
        <div class="row">
          <div class="header__inner col col-12">
            <div class="footer__social" aria-label="Social links">
              <a class="social-link" href="https://x.com/timesofmadeira" title="Twitter">Twitter</a>
              <a class="social-link" href="https://www.facebook.com/timesofmadeira" title="Facebook">Facebook</a>
              <a class="social-link" href="https://www.instagram.com/timesofmadeira/" title="Instagram">Instagram</a>
            </div>

            <div class="logo" aria-label="Times of Madeira">
              <a class="logo__link" href="/">
                <img class="logo__image" src="/assets/times-of-madeira-logo.svg" alt="Times of Madeira" />
              </a>
            </div>

            <div class="hamburger" id="hamburger" onclick="document.getElementById('menuList').classList.toggle('is-visible'); this.classList.toggle('is-open')">
              <div></div>
            </div>

            <nav class="main-nav" aria-label="Main menu" id="menuList">
              <div class="main-nav__box">
                <ul class="nav__list list-reset">
                  <li class="nav__item"><a class="nav__link" href="/">Home</a></li>
                  <li class="nav__item"><a class="nav__link" href="/tag/society/">Society</a></li>
                  <li class="nav__item"><a class="nav__link" href="/tag/tourism/">Tourism</a></li>
                  <li class="nav__item"><a class="nav__link" href="/tag/politics/">Politics</a></li>
                  <li class="nav__item"><a class="nav__link" href="/tag/funchal/">Funchal</a></li>
                  <li class="nav__item"><a class="nav__link" href="/tag/economy/">Economy</a></li>
                </ul>
              </div>

              <div class="nav-button">
                <div class="nav-search">
                  <a class="nav-search-button" href="/tag/" aria-label="Search tags"><i aria-hidden="true">⌕</i></a>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
    <main class="content" role="main">
      <div class="container">
        <div class="row">
          <div class="col col-12">
            <section class="tag-page">
              <h1>Tags</h1>
              <ul class="tag-index-list">${rows}</ul>
            </section>
          </div>
        </div>
      </div>
    </main>
  </body>
</html>`;
}

console.log('Static site build complete in _site');
