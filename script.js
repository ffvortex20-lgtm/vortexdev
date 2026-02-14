// --- CONFIGURAÇÃO PERSONALIZÁVEL ---
const CONFIG = {
    hero: {
        title: "Feito com Precisão",
        subtitle: "Poder e estabilidade incomparáveis."
    },
    tabs: ["Software", "Tools", "Servers"],
    products: [
        {
            category: "Software",
            name: "Velocity Roblox Windows",
            desc: "Melhor performance para Windows.",
            img: "https://via.placeholder.com/300x150",
            link: "https://seu-link-de-download.com/arquivo.exe"
        },
        {
            category: "Tools",
            name: "Velocity API .NET",
            desc: "Poderosa API para desenvolvedores.",
            img: "https://via.placeholder.com/300x150",
            link: "https://seu-link.com/api"
        }
    ],
    tinyUrlApiKey: "SUA_API_KEY_AQUI" // Opcional se quiser usar premium
};

// --- LÓGICA DO SITE ---

function renderTabs() {
    const container = document.getElementById('tabs-container');
    CONFIG.tabs.forEach((tab, index) => {
        const btn = document.createElement('button');
        btn.innerText = tab;
        btn.onclick = () => filterProducts(tab);
        if(index === 0) btn.classList.add('active');
        container.appendChild(btn);
    });
}

async function shortenLink(url) {
    // Usando a API pública do TinyURL
    try {
        const response = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`);
        return await response.text();
    } catch (err) {
        return url; // Se der erro, retorna o link normal
    }
}

async function renderProducts(category) {
    const grid = document.getElementById('products-grid');
    grid.innerHTML = ""; // Limpa a grade
    
    const filtered = CONFIG.products.filter(p => p.category === category);

    for (const p of filtered) {
        const shortUrl = await shortenLink(p.link); // Encurta na hora de gerar o card
        
        grid.innerHTML += `
            <div class="card">
                <img src="${p.img}" alt="${p.name}">
                <h3>${p.name}</h3>
                <p>${p.desc}</p>
                <button class="btn-download" onclick="window.location.href='${shortUrl}'">Download</button>
            </div>
        `;
    }
}

function filterProducts(category) {
    renderProducts(category);
    // Lógica para mudar a classe 'active' nos botões
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    renderTabs();
    renderProducts(CONFIG.tabs[0]);
});
