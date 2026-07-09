const SUPABASE_URL = "https://rbfhbcsgjsypuzzgcbpo.supabase.co";
const SUPABASE_KEY = "sb_publishable_rV4oivvNDiHh_O_2TLKAQQ_I29j5muX"; 
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function fetchFeed() {
    try {
        const { data, error } = await supabaseClient
            .from('posts')
            .select('title, slug, description')
            .order('id', { ascending: false });
        
        if (error) {
            console.error("Supabase Error:", error);
            return;
        }
        
        let html = "";
        data.forEach(post => {
            html += `
            <article class="post-card">
                <h2><a href="article.html?post=${post.slug}">${post.title}</a></h2>
                <p>${post.description}</p>
            </article>`;
        });
        
        const grid = document.getElementById('news-grid') || document.getElementById('posts-container');
        if (grid) {
            grid.innerHTML = html;
        }
    } catch (err) {
        console.error(err);
    }
}

document.addEventListener("DOMContentLoaded", fetchFeed);
