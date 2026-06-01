/* ═══════════════════════════════════════════════
   ReMemória — App Logic
   Firebase · Leaflet · Comparação slider
═══════════════════════════════════════════════ */

// ── Dados dos patrimônios ──────────────────────
// (Em produção, viriam do Firebase Firestore)
const PATRIMONIOS = [
  {
    id: "museu-municipal",
    nome: "Museu Municipal de São José",
    endereco: "Rua Benedito dos Santos, 625 — Centro",
    dist: "A 350m do seu local",
    categoria: "historico",
    fundado: "1927",
    estilo: "Arquitetura Colonial",
    destaque: true,
    lat: -23.1794,
    lng: -45.8847,
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Museu_Municipal_de_S%C3%A3o_Jos%C3%A9_dos_Campos_-_panoramio.jpg/640px-Museu_Municipal_de_S%C3%A3o_Jos%C3%A9_dos_Campos_-_panoramio.jpg",
    imgAfter: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Museu_Municipal_de_S%C3%A3o_Jos%C3%A9_dos_Campos.jpg/640px-Museu_Municipal_de_S%C3%A3o_Jos%C3%A9_dos_Campos.jpg",
    estado: [
      { label: "Estrutura: Bom",        dot: "green"  },
      { label: "Fachada: Desgastada",   dot: "yellow" },
      { label: "Telhado: Infiltração",  dot: "red"    }
    ],
    simulacoes: ["Restaurar fachada","Reparar estrutura","Pintura histórica","Conservação geral"],
    simResultTags: ["🔵 Melhoria na fachada","✅ Redução de infiltração","🏛️ Estilo original"],
    compareDesc: "Restauração da fachada e telhado. Reconstrução de elementos arquitetônicos em madeira e recuperação de estaque original. Intervenção baseada em documentação histórica.",
    desc: "O Museu Municipal de São José dos Campos é um dos mais importantes centros culturais da cidade. Inaugurado em 1927, preserva vasto acervo histórico e cultural da região do Vale do Paraíba. A arquitetura colonial é tombada como patrimônio histórico estadual.",
    conservacao: 65
  },
  {
    id: "igreja-sao-benedito",
    nome: "Igreja São Benedito",
    endereco: "Praça Afonso Pena, 267, Centro",
    dist: "A 350m do seu local",
    categoria: "historico",
    fundado: "1750",
    estilo: "Barroco Paulista",
    destaque: true,
    lat: -23.1826,
    lng: -45.8832,
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Igreja_de_S%C3%A3o_Benedito_-_S%C3%A3o_Jos%C3%A9_dos_Campos.jpg/640px-Igreja_de_S%C3%A3o_Benedito_-_S%C3%A3o_Jos%C3%A9_dos_Campos.jpg",
    imgAfter: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Igreja_S%C3%A3o_Benedito_SJC_2.jpg/640px-Igreja_S%C3%A3o_Benedito_SJC_2.jpg",
    estado: [
      { label: "Estrutura: Boa",     dot: "green"  },
      { label: "Fachada: Boa",       dot: "green"  },
      { label: "Pintura: Desgaste",  dot: "yellow" }
    ],
    simulacoes: ["Pintura histórica","Conservação geral","Restaurar altar"],
    simResultTags: ["🎨 Pintura renovada","✅ Maior durabilidade","🏛️ Estilo barroco"],
    compareDesc: "Renovação completa da pintura externa com pigmentos históricos. Conservação de elementos decorativos barrocos e reforço estrutural das torres.",
    desc: "A Igreja São Benedito é um dos monumentos mais antigos de São José dos Campos. Construída em meados do século XVIII, representa a fé e a história da comunidade afrodescendente local. O interior guarda belas pinturas e esculturas sacras de grande valor artístico.",
    conservacao: 80
  },
  {
    id: "centro-cultural",
    nome: "Centro Cultural",
    endereco: "Av. Olivo Gomes, 100 — Centro",
    dist: "A 800m do seu local",
    categoria: "cultural",
    fundado: "1985",
    estilo: "Arquitetura Moderna",
    destaque: false,
    lat: -23.1780,
    lng: -45.8790,
    img: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=640&q=80",
    imgAfter: "https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=640&q=80",
    estado: [
      { label: "Estrutura: Boa",     dot: "green"  },
      { label: "Fachada: Boa",       dot: "green"  },
      { label: "Interior: Bom",      dot: "green"  }
    ],
    simulacoes: ["Conservação geral","Modernização","Acessibilidade"],
    simResultTags: ["✅ Excelente estado","🎭 Espaço preservado"],
    compareDesc: "Manutenção preventiva e ampliação de acessibilidade. Instalação de rampas e adaptações para pessoas com deficiência.",
    desc: "O Centro Cultural de São José dos Campos é o principal espaço dedicado às artes e à cultura na cidade. Promove exposições, espetáculos e oficinas ao longo do ano, sendo ponto de encontro da comunidade artística.",
    conservacao: 90
  },
  {
    id: "parque-vicentina",
    nome: "Parque Vicentina Aranha",
    endereco: "Rua Vicentina Aranha — Centro",
    dist: "A 1.2km do seu local",
    categoria: "natural",
    fundado: "1935",
    estilo: "Patrimônio Natural",
    destaque: false,
    lat: -23.1756,
    lng: -45.8870,
    img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=640&q=80",
    imgAfter: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=640&q=80",
    estado: [
      { label: "Vegetação: Boa",     dot: "green"  },
      { label: "Estrutura: Regular", dot: "yellow" },
      { label: "Patrimônio Vivo",    dot: "green"  }
    ],
    simulacoes: ["Revegetação","Restauro dos caminhos","Conservação geral"],
    simResultTags: ["🌿 Maior cobertura verde","✅ Biodiversidade preservada"],
    compareDesc: "Projeto de revegetação com espécies nativas da Mata Atlântica e restauro dos caminhos históricos do parque.",
    desc: "O Parque Vicentina Aranha é um refúgio verde no coração de São José dos Campos. Tombado como patrimônio natural, abriga exemplares centenários da Mata Atlântica e trilhas históricas que contam a história da cidade.",
    conservacao: 75
  },
  {
    id: "teatro-municipal",
    nome: "Teatro Municipal",
    endereco: "Praça Afonso Pena — Centro",
    dist: "A 500m do seu local",
    categoria: "cultural",
    fundado: "1962",
    estilo: "Art Déco",
    destaque: false,
    lat: -23.1810,
    lng: -45.8820,
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=640&q=80",
    imgAfter: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=640&q=80",
    estado: [
      { label: "Estrutura: Boa",    dot: "green"  },
      { label: "Fachada: Regular",  dot: "yellow" },
      { label: "Acústica: Boa",     dot: "green"  }
    ],
    simulacoes: ["Restaurar fachada","Conservação geral","Modernização técnica"],
    simResultTags: ["🎭 Fachada renovada","✅ Estilo art déco preservado"],
    compareDesc: "Restauração dos elementos art déco da fachada e modernização dos sistemas de iluminação cênica mantendo as características históricas.",
    desc: "O Teatro Municipal é o principal palco das artes cênicas em São José dos Campos. Com arquitetura art déco dos anos 60, recebeu grandes nomes da cultura brasileira e continua sendo referência cultural para toda a região.",
    conservacao: 72
  }
];

// ── Localização do usuário ─────────────────────
let userLocation = null;

function calcDist(lat1, lng1, lat2, lng2) {
  const R = 6371000; // metros
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLng/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

function formatDist(m) {
  if (m < 1000) return `A ${Math.round(m)}m de você`;
  return `A ${(m/1000).toFixed(1)}km de você`;
}

function requestLocation() {
  if (!navigator.geolocation) return;
  navigator.geolocation.getCurrentPosition(pos => {
    userLocation = { lat: pos.coords.latitude, lng: pos.coords.longitude };
    renderHome();
  }, () => {}, { enableHighAccuracy: false, timeout: 8000 });
}

// ── Estado global ──────────────────────────────
let currentPatrimonio = null;
let favorites = JSON.parse(localStorage.getItem("rememoria_favs") || "[]");
let visited   = JSON.parse(localStorage.getItem("rememoria_vis")  || "[]");
let activeSimBtn = null;
let mapInstance = null;
let mapMarkers  = [];

// ══════════════════════════════════════════════
// INIT
// ══════════════════════════════════════════════
window.addEventListener("DOMContentLoaded", () => {
  setTimeout(initApp, 5000);
});

async function initApp() {
  // Tenta carregar do Firebase, senão usa dados locais
  if (window._db) {
    try {
      const { collection, getDocs } = window._fbModules;
      const snap = await getDocs(collection(window._db, "patrimonios"));
      if (!snap.empty) {
        // Sobrescreve o array local com os dados do Firestore
        PATRIMONIOS.length = 0;
        snap.forEach(doc => PATRIMONIOS.push({ id: doc.id, ...doc.data() }));
      }
    } catch(e) {
      console.warn("Usando dados locais:", e.message);
    }
  }

  // Esconde o splash e exibe o app
  document.getElementById("splash").style.display = "none";
  document.getElementById("app").classList.remove("hidden");

  // Continua a inicialização normalmente
  requestLocation();
  renderHome();
  initMap();
  renderIA();
  renderFavs();
  updateProfileStats();

}

// ══════════════════════════════════════════════
// NAVEGAÇÃO
// ══════════════════════════════════════════════
function goTo(screen, btn) {
  // Guard: admin screen requires active admin session
  if (screen === "admin" && !authState.isAdmin) {
    openLoginModal();
    return;
  }
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.querySelectorAll(".nav-item").forEach(b => b.classList.remove("active"));
  document.getElementById("screen-" + screen).classList.add("active");
  if (btn) btn.classList.add("active");

  if (screen === "mapa" && mapInstance) {
    setTimeout(() => mapInstance.invalidateSize(), 100);
  }
  if (screen === "favoritos") renderFavs();
  if (screen === "admin") renderAdminSessionBar();
}

// ══════════════════════════════════════════════
// HOME
// ══════════════════════════════════════════════
function renderHome(list) {
  const data = list || PATRIMONIOS;
  // Destaques
  const featured = data.filter(p => p.destaque);
  document.getElementById("featuredCards").innerHTML = featured.map(p => `
    <div class="feat-card" onclick='openModalById("${p.id}")'>
      <img src="${p.img}" alt="${p.nome}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400'">
      <div class="feat-card-info">
        <div class="feat-card-name">${p.nome}</div>
        <div class="feat-card-loc">${p.endereco.split("—")[1] || p.endereco}</div>
      </div>
    </div>
  `).join("");

  // Próximos (ordenados por distância real se disponível)
  let nearby = [...data];
  if (userLocation) {
    nearby.forEach(p => {
      p._dist = calcDist(userLocation.lat, userLocation.lng, p.lat, p.lng);
    });
    nearby.sort((a, b) => a._dist - b._dist);
  }
  nearby = nearby.slice(0, 4);
  document.getElementById("nearbyList").innerHTML = nearby.map(p => {
    const distLabel = (userLocation && p._dist != null)
      ? formatDist(p._dist)
      : p.dist;
    return `
    <div class="list-item" onclick='openModalById("${p.id}")'>
      <img class="list-img" src="${p.img}" alt="${p.nome}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400'">
      <div class="list-info">
        <div class="list-name">${p.nome}</div>
        <div class="list-addr">${p.endereco}</div>
        <div class="list-dist">📍 ${distLabel}</div>
      </div>
      <span class="list-arrow">›</span>
    </div>
  `}).join("");
}

function filterSearch(q) {
  if (!q.trim()) { renderHome(); return; }
  const r = PATRIMONIOS.filter(p =>
    p.nome.toLowerCase().includes(q.toLowerCase()) ||
    p.endereco.toLowerCase().includes(q.toLowerCase()) ||
    p.categoria.toLowerCase().includes(q.toLowerCase())
  );
  renderHome(r);
}

// ══════════════════════════════════════════════
// MAPA (Leaflet)
// ══════════════════════════════════════════════
function initMap() {
  mapInstance = L.map("map", {
    center: [-23.1794, -45.8847],
    zoom: 15,
    zoomControl: false
  });

  // CartoDB Voyager — mapa elegante com ruas legíveis e visual refinado
  L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> © <a href="https://carto.com/">CARTO</a>',
    subdomains: "abcd",
    maxZoom: 20
  }).addTo(mapInstance);

  L.control.zoom({ position: "bottomright" }).addTo(mapInstance);

  addMapMarkers(PATRIMONIOS);
}

function addMapMarkers(data) {
  mapMarkers.forEach(m => mapInstance.removeLayer(m));
  mapMarkers = [];

  data.forEach(p => {
    const catCfg = {
      historico: { emoji: "🏛", color: "#6B1A2A", accent: "#C4973A", ring: "rgba(107,26,42,0.25)" },
      cultural:  { emoji: "🎭", color: "#5A2775", accent: "#C484E8", ring: "rgba(90,39,117,0.25)" },
      natural:   { emoji: "🌿", color: "#1A5C2A", accent: "#5CB86E", ring: "rgba(26,92,42,0.25)" },
    };
    const cfg = catCfg[p.categoria] || catCfg.historico;

    const icon = L.divIcon({
      className: "",
      html: `
        <div style="position:relative;width:52px;height:62px;">
          <!-- Pulse ring -->
          <div style="
            position:absolute;top:4px;left:4px;
            width:44px;height:44px;border-radius:50%;
            background:${cfg.ring};
            animation:markerPulse 2.4s ease-out infinite;
          "></div>
          <!-- Pin body -->
          <div style="
            position:absolute;top:0;left:0;
            width:44px;height:44px;
            border-radius:50% 50% 50% 4px;
            background:linear-gradient(145deg,${cfg.color},${cfg.color}cc);
            border:3px solid white;
            box-shadow:0 6px 20px rgba(0,0,0,.35),0 2px 6px rgba(0,0,0,.2),inset 0 1px 0 rgba(255,255,255,.2);
            display:flex;align-items:center;justify-content:center;
            transform:rotate(-45deg);
          ">
            <span style="transform:rotate(45deg);font-size:18px;line-height:1;">${cfg.emoji}</span>
          </div>
          <!-- Pin tail -->
          <div style="
            position:absolute;bottom:0;left:50%;transform:translateX(-50%);
            width:4px;height:16px;
            background:linear-gradient(to bottom,${cfg.color},transparent);
            border-radius:0 0 4px 4px;
          "></div>
          <!-- Gold dot accent -->
          <div style="
            position:absolute;top:-2px;right:0;
            width:12px;height:12px;border-radius:50%;
            background:${cfg.accent};
            border:2px solid white;
            box-shadow:0 2px 4px rgba(0,0,0,.3);
          "></div>
        </div>
      `,
      iconSize: [52, 62],
      iconAnchor: [26, 62],
      popupAnchor: [0, -64]
    });

    const conservColor = p.conservacao >= 80 ? "#3A7D44" : p.conservacao >= 60 ? "#C4973A" : "#C43A3A";
    const catLabel = { historico: "Histórico", cultural: "Cultural", natural: "Natural" }[p.categoria] || p.categoria;
    const catEmoji = { historico: "🏛", cultural: "🎭", natural: "🌿" }[p.categoria] || "📍";

    const popup = L.popup({
      closeButton: false,
      maxWidth: 240,
      className: "rememoria-popup"
    }).setContent(`
      <div class="map-popup">
        <div class="map-popup-img-wrap">
          <img src="${p.img}" alt="${p.nome}" onerror="this.src='https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400'">
          <div class="map-popup-cat-badge">${catEmoji} ${catLabel}</div>
        </div>
        <div class="map-popup-body">
          <div class="map-popup-name">${p.nome}</div>
          <div class="map-popup-addr">📍 ${p.endereco}</div>
          <div class="map-popup-conserv">
            <div class="map-popup-conserv-bar">
              <div style="width:${p.conservacao||0}%;background:${conservColor};height:100%;border-radius:99px;transition:width .4s"></div>
            </div>
            <span class="map-popup-conserv-label" style="color:${conservColor}">${p.conservacao||0}%</span>
          </div>
        </div>
        <button class="map-popup-btn" onclick="openModalById('${p.id}')">Ver detalhes →</button>
      </div>
    `);

    const marker = L.marker([p.lat, p.lng], { icon }).addTo(mapInstance).bindPopup(popup);
    mapMarkers.push(marker);
  });
}

function filterMap(cat, btn) {
  document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");

  const filtered = cat === "all" ? PATRIMONIOS : PATRIMONIOS.filter(p => p.categoria === cat);
  addMapMarkers(filtered);
}

function locateUser() {
  if (!navigator.geolocation) { alert("Geolocalização não suportada."); return; }
  navigator.geolocation.getCurrentPosition(pos => {
    mapInstance.flyTo([pos.coords.latitude, pos.coords.longitude], 15);
  }, () => {
    alert("Não foi possível obter sua localização.");
  });
}

function toggleMapSettings() {
  alert("Configurações do mapa em breve!");
}

// ══════════════════════════════════════════════
// MODAL DETALHE
// ══════════════════════════════════════════════
function openModal(p) {
  currentPatrimonio = p;
  activeSimBtn = null;

  document.getElementById("mImg").src = p.img;
  document.getElementById("mImg").onerror = function(){ this.src='https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400'; };
  document.getElementById("mTitle").textContent  = p.nome;
  document.getElementById("mAddr").textContent = p.endereco;
  // Distância real
  if (userLocation && p.lat && p.lng) {
    const d = calcDist(userLocation.lat, userLocation.lng, p.lat, p.lng);
    document.getElementById("mAddr").textContent = p.endereco + " · " + formatDist(d);
  }
  // Tags
  const catIcons = { historico:"🏛️", cultural:"🎭", natural:"🌿" };
  document.getElementById("mTags").innerHTML = `
    <span class="tag">${catIcons[p.categoria]||"📍"} Centro Histórico</span>
    <span class="tag">📅 Fundado em ${p.fundado}</span>
    <span class="tag">🏗️ ${p.estilo}</span>
  `;

  // Estado
  const estado = Array.isArray(p.estado) ? p.estado : [];
  document.getElementById("mEstado").innerHTML = estado.map(e => `
    <div class="estado-item">
      <div class="dot dot-${e.dot}"></div>
      <span>${e.label}</span>
    </div>
  `).join("");

  // Descrição logo após estado
  document.getElementById("mDesc").textContent = p.desc || "";

  // Simulações
  const simulacoes = Array.isArray(p.simulacoes) ? p.simulacoes : [];
  document.getElementById("mSimBtns").innerHTML = simulacoes.map(s => `
    <button class="sim-btn" onclick="selectSim(this,'${s}')">${s}</button>
  `).join("");

  // Tags resultado simulação
  const simResultTags = Array.isArray(p.simResultTags) ? p.simResultTags : [];
  document.getElementById("mSimTags").innerHTML = simResultTags.map(t => `
    <span class="sim-tag">${t}</span>
  `).join("");

  // Favorito
  updateFavBtn();

  // Visita
  if (!visited.includes(p.id)) {
    visited.push(p.id);
    localStorage.setItem("rememoria_vis", JSON.stringify(visited));
    updateProfileStats();
  }

  document.getElementById("modalOverlay").classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function openModalById(id) {
  const p = PATRIMONIOS.find(x => x.id === id);
  if (p) openModal(p);
}

function closeModal(e) {
  if (e && e.target !== document.getElementById("modalOverlay")) return;
  document.getElementById("modalOverlay").classList.add("hidden");
  document.body.style.overflow = "";
}

// Favoritos
function toggleFav() {
  if (!currentPatrimonio) return;
  const id = currentPatrimonio.id;
  if (favorites.includes(id)) {
    favorites = favorites.filter(f => f !== id);
  } else {
    favorites.push(id);
  }
  localStorage.setItem("rememoria_favs", JSON.stringify(favorites));
  updateFavBtn();
  updateProfileStats();
}

function updateFavBtn() {
  if (!currentPatrimonio) return;
  const btn = document.getElementById("mFavBtn");
  const isFav = favorites.includes(currentPatrimonio.id);
  btn.textContent = isFav ? "★" : "☆";
  btn.classList.toggle("active", isFav);
}

// Simulação
function selectSim(btn, name) {
  document.querySelectorAll(".sim-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  activeSimBtn = name;
}

function applySimulation() {
  if (!activeSimBtn) {
    document.querySelector(".sim-btn")?.click();
    return;
  }
  alert(`Simulação "${activeSimBtn}" aplicada com sucesso!`);
}

function show3D() {
  alert("Visualização 3D em desenvolvimento!\nEm breve você poderá explorar o patrimônio em realidade aumentada.");
}

// ══════════════════════════════════════════════
// COMPARAÇÃO
// ══════════════════════════════════════════════
function openComparacao() {
  if (!currentPatrimonio) return;
  const p = currentPatrimonio;

  document.getElementById("cImgBefore").src = p.img;
  document.getElementById("cImgAfter").src  = p.imgAfter || p.img;
  document.getElementById("cDesc").textContent = p.compareDesc;

  document.getElementById("compareOverlay").classList.remove("hidden");
  initSlider();
}

function closeCompare(e) {
  if (e && e.target !== document.getElementById("compareOverlay")) return;
  document.getElementById("compareOverlay").classList.add("hidden");
  removeSlider();
}

// Slider de comparação
let sliderDragging = false;

function initSlider() {
  const divider = document.getElementById("compareDivider");
  const slider  = document.getElementById("compareSlider");
  const after   = document.querySelector(".compare-after");

  setSlider(0.5, after, divider);

  // Mouse
  divider.addEventListener("mousedown", startDrag);
  window.addEventListener("mousemove", onDrag);
  window.addEventListener("mouseup", stopDrag);

  // Touch
  divider.addEventListener("touchstart", startDrag, { passive: true });
  window.addEventListener("touchmove", onDrag, { passive: false });
  window.addEventListener("touchend", stopDrag);

  function startDrag() { sliderDragging = true; }
  function stopDrag()  { sliderDragging = false; }
  function onDrag(e) {
    if (!sliderDragging) return;
    if (e.cancelable) e.preventDefault();
    const rect = slider.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const ratio = Math.max(0.05, Math.min(0.95, (clientX - rect.left) / rect.width));
    setSlider(ratio, after, divider);
  }
}

function setSlider(ratio, after, divider) {
  const pct = (ratio * 100).toFixed(1);
  after.style.width = pct + "%";
  divider.style.left = pct + "%";
}

function removeSlider() {
  sliderDragging = false;
}

// ══════════════════════════════════════════════
// IA SCREEN
// ══════════════════════════════════════════════
function renderIA() {
  // Renderiza apenas o chatbot
  renderChatbot();
  // Também renderiza a lista de patrimônios na aba IA
  document.getElementById("iaPatrimList").innerHTML = PATRIMONIOS.map(p => {
    const c = p.conservacao;
    const cls = c >= 80 ? "score-good" : c >= 60 ? "score-mid" : "score-bad";
    return `
      <div class="ia-item" onclick='openModalById("${p.id}")'>
        <img class="ia-item-img" src="${p.img}" alt="${p.nome}" onerror="this.src='https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400'">
        <div class="ia-item-info">
          <div class="ia-item-name">${p.nome}</div>
          <div class="ia-item-score">
            <div class="score-bar">
              <div class="score-fill ${cls}" style="width:${c}%"></div>
            </div>
            <span>${c}%</span>
          </div>
          <div style="font-size:11px;color:var(--text-muted);margin-top:3px">
            ${p.estado.map(e => `<span style="margin-right:6px">• ${e.label}</span>`).join("")}
          </div>
        </div>
      </div>
    `;
  }).join("");
}

// ══════════════════════════════════════════════
// FAVORITOS
// ══════════════════════════════════════════════
function renderFavs() {
  const favList = document.getElementById("favList");
  const favData = PATRIMONIOS.filter(p => favorites.includes(p.id));
  if (!favData.length) {
    favList.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">⭐</div>
        <p>Nenhum favorito ainda.<br/>Explore e salve patrimônios!</p>
      </div>
    `;
    return;
  }
  favList.innerHTML = favData.map(p => `
    <div class="list-item" onclick='openModalById("${p.id}")'>
      <img class="list-img" src="${p.img}" alt="${p.nome}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400'">
      <div class="list-info">
        <div class="list-name">${p.nome}</div>
        <div class="list-addr">${p.endereco}</div>
        <div class="list-dist">📍 ${p.dist}</div>
      </div>
      <span class="list-arrow">›</span>
    </div>
  `).join("");
}

// ══════════════════════════════════════════════
// PERFIL
// ══════════════════════════════════════════════
function updateProfileStats() {
  document.getElementById("statVisited").textContent = visited.length;
  document.getElementById("statFav").textContent = favorites.length;
}

// ══════════════════════════════════════════════
// NOTIFICAÇÕES (placeholder)
// ══════════════════════════════════════════════
function openNotif() {
  alert("🔔 Notificações\n\n• Igreja São Benedito: manutenção programada\n• Novo patrimônio cadastrado: Palácio das Artes\n• Conquista desbloqueada: Explorador Histórico");
}

// ══════════════════════════════════════════════
// FIREBASE — salvar/ler favoritos (modo produção)
// ══════════════════════════════════════════════
async function saveFavToFirebase(id) {
  if (!window._db) return;
  try {
    const { collection, setDoc, doc } = window._fbModules;
    await setDoc(doc(window._db, "favorites", `user_${id}`), { id, ts: Date.now() });
  } catch(e) { console.warn("Firebase save error:", e); }
}

async function loadFavsFromFirebase() {
  if (!window._db) return;
  try {
    const { collection, getDocs } = window._fbModules;
    const snap = await getDocs(collection(window._db, "favorites"));
    favorites = snap.docs.map(d => d.data().id);
    localStorage.setItem("rememoria_favs", JSON.stringify(favorites));
    renderFavs();
    updateProfileStats();
  } catch(e) { console.warn("Firebase load error:", e); }
}

// Inicializa firebase se disponível
window.addEventListener("load", () => {
  loadFavsFromFirebase();
});

// ══════════════════════════════════════════════
// CHATBOT IA PATRIMONIAL
// ══════════════════════════════════════════════
let chatSelectedPatrimonio = null;
let chatHistory = [];

function renderChatbot() {
  const container = document.getElementById("ia-chatbot-wrap");
  if (!container) return;

  const options = PATRIMONIOS.map(p =>
    `<option value="${p.id}">${p.nome}</option>`
  ).join("");

  container.innerHTML = `
    <div class="chatbot-wrap">
      <div class="chatbot-header">
        <div class="chatbot-avatar">🤖</div>
        <div class="chatbot-header-info">
          <h4>Assistente ReMemória</h4>
          <span>Pergunte sobre os patrimônios</span>
        </div>
      </div>

      <div class="chatbot-patrimonio-selector">
        <label>Patrimônio selecionado</label>
        <select id="chatPatrimSelect" onchange="selectChatPatrimonio(this.value)">
          <option value="">— Escolha um patrimônio —</option>
          ${options}
        </select>
      </div>

      <div class="chatbot-suggestions" id="chatSuggestions">
        <button class="chat-suggestion" onclick="sendChatSuggestion('Qual é a história deste patrimônio?')">📜 História</button>
        <button class="chat-suggestion" onclick="sendChatSuggestion('Qual é o estado de conservação atual?')">🔍 Conservação</button>
        <button class="chat-suggestion" onclick="sendChatSuggestion('Que intervenções são recomendadas?')">🏗️ Intervenções</button>
        <button class="chat-suggestion" onclick="sendChatSuggestion('Como chego até lá?')">📍 Como chegar</button>
      </div>

      <div class="chatbot-messages" id="chatMessages">
        <div class="chat-msg bot">Olá! Sou o assistente do ReMemória. Selecione um patrimônio acima e me faça perguntas sobre sua história, estado de conservação ou como visitar! 🏛️</div>
      </div>

      <div class="chatbot-input-row">
        <input class="chatbot-input" id="chatInput" type="text" placeholder="Pergunte sobre o patrimônio..." onkeydown="if(event.key==='Enter') sendChat()" />
        <button class="chatbot-send" onclick="sendChat()">➤</button>
      </div>
    </div>
  `;
}

function selectChatPatrimonio(id) {
  chatSelectedPatrimonio = PATRIMONIOS.find(p => p.id === id) || null;
  
  // Limpa o histórico completamente (deixando-o vazio para a primeira pergunta)
  chatHistory = []; 
  
  const msgs = document.getElementById("chatMessages");
  if (!msgs) return;
  
  if (chatSelectedPatrimonio) {
    // A saudação aparece na tela, mas NÃO entra no array chatHistory
    msgs.innerHTML = `<div class="chat-msg bot">Ótimo! Agora posso te contar tudo sobre <strong>${chatSelectedPatrimonio.nome}</strong>. O que você quer saber? 🏛️</div>`;
  } else {
    msgs.innerHTML = `<div class="chat-msg bot">Selecione um patrimônio para começarmos! 😊</div>`;
  }
}

async function sendChat() {
  const input = document.getElementById("chatInput");
  const msgs  = document.getElementById("chatMessages");
  if (!input || !msgs) return;

  const text = input.value.trim();
  if (!text) return;

  if (!chatSelectedPatrimonio) {
    appendChatMsg(msgs, "bot", "Por favor, selecione um patrimônio primeiro! 👆");
    return;
  }

  input.value = "";
  appendChatMsg(msgs, "user", text);
  chatHistory.push({ role: "user", content: text });

  // Typing indicator
  const typingId = "typing-" + Date.now();
  msgs.innerHTML += `<div class="chat-msg typing" id="${typingId}">digitando...</div>`;
  msgs.scrollTop = msgs.scrollHeight;

  const p = chatSelectedPatrimonio;
  const estadoStr = (p.estado || []).map(e => e.label).join(", ");
  const simsStr   = (p.simulacoes || []).join(", ");

  const systemPrompt = `Você é um assistente especializado em patrimônios históricos do aplicativo ReMemória. Responda sempre em português brasileiro, de forma amigável, concisa (máximo 3 parágrafos) e informativa. Use os dados abaixo do patrimônio selecionado para embasar suas respostas.

PATRIMÔNIO: ${p.nome}
ENDEREÇO: ${p.endereco}
CATEGORIA: ${p.categoria}
FUNDADO: ${p.fundado}
ESTILO: ${p.estilo}
ESTADO DE CONSERVAÇÃO: ${p.conservacao}% — ${estadoStr}
INTERVENÇÕES POSSÍVEIS: ${simsStr}
DESCRIÇÃO: ${p.desc}
LOCALIZAÇÃO: lat ${p.lat}, lng ${p.lng} (São José dos Campos, SP)

Responda à pergunta do usuário com base nesses dados. Se perguntarem sobre como chegar, mencione que fica em São José dos Campos e dê dicas gerais. Seja útil e entusiasmado com a preservação do patrimônio histórico.`;

  try {
    // Monta histórico garantindo alternância user/assistant correta
    const messages = chatHistory.slice(-8);

    // Chama o proxy local (server.js) — a API key fica segura no servidor
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system:   systemPrompt,
        messages: messages
      })
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData?.error?.message || `HTTP ${response.status}`);
    }

    const data = await response.json();
    // Gemini retorna { reply: "..." } via nosso proxy
    const reply = (data.reply || "").trim()
      || "Desculpe, não consegui processar sua pergunta.";

    // Registra a resposta do assistente no histórico
    chatHistory.push({ role: "assistant", content: reply });

    const typingEl = document.getElementById(typingId);
    if (typingEl) typingEl.remove();
    appendChatMsg(msgs, "bot", reply);
  } catch(err) {
    const typingEl = document.getElementById(typingId);
    if (typingEl) typingEl.remove();
    console.error("Erro IA:", err);
    appendChatMsg(msgs, "bot", `Erro ao conectar com a IA: ${err.message || "verifique sua conexão e tente novamente."}`);
  }
}

function appendChatMsg(container, type, text) {
  const div = document.createElement("div");
  div.className = `chat-msg ${type}`;
  div.innerHTML = text; // Alterado para permitir formatação de texto e quebras de linha se necessário
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}
function sendChatSuggestion(text) {
// Envia sugestão ao input e dispara o envio
  const input = document.getElementById("chatInput");
  if (!input) return;
  input.value = text;
  sendChat(); // Dispara o envio automático da sugestão clicada
  
}

// ══════════════════════════════════════════════
// ADMIN — Painel de Gestão de Patrimônios
// ══════════════════════════════════════════════

function switchAdminTab(tab, btn) {
  document.querySelectorAll(".admin-tab").forEach(t => t.classList.remove("active"));
  document.querySelectorAll(".admin-tab-content").forEach(c => c.classList.remove("active"));
  btn.classList.add("active");
  document.getElementById("admin-tab-" + tab).classList.add("active");
  if (tab === "lista") loadAdminList();
}

function updateConservLabel(val) {
  document.getElementById("conserv-label").textContent = val + "%";
}

function previewImg(inputId, previewId) {
  const url = document.getElementById(inputId).value.trim();
  const img = document.getElementById(previewId);
  if (url) {
    img.src = url;
    img.classList.remove("hidden");
    img.onerror = () => img.classList.add("hidden");
  } else {
    img.classList.add("hidden");
  }
}

function addEstadoRow() {
  const container = document.getElementById("estadoInputs");
  if (container.querySelectorAll(".estado-input-row").length >= 4) {
    showAdminMsg("Máximo de 4 itens de estado.", "warn");
    return;
  }
  const row = document.createElement("div");
  row.className = "estado-input-row";
  row.innerHTML = `
    <select class="estado-dot-sel">
      <option value="green">🟢</option>
      <option value="yellow">🟡</option>
      <option value="red">🔴</option>
    </select>
    <input type="text" placeholder="Ex: Fachada: Desgastada" class="estado-label-inp" />
    <button type="button" class="btn-rm-estado" onclick="removeEstado(this)">✕</button>
  `;
  container.appendChild(row);
}

function removeEstado(btn) {
  const rows = document.querySelectorAll(".estado-input-row");
  if (rows.length <= 1) { showAdminMsg("Mínimo de 1 item.", "warn"); return; }
  btn.closest(".estado-input-row").remove();
}

function getMyCoords() {
  if (!navigator.geolocation) { showAdminMsg("Geolocalização não suportada.", "error"); return; }
  showAdminMsg("Obtendo localização...", "info");
  navigator.geolocation.getCurrentPosition(pos => {
    document.getElementById("af-lat").value = pos.coords.latitude.toFixed(6);
    document.getElementById("af-lng").value = pos.coords.longitude.toFixed(6);
    showAdminMsg("Coordenadas preenchidas com sucesso! ✅", "success");
  }, () => showAdminMsg("Não foi possível obter localização.", "error"));
}

function showAdminMsg(text, type) {
  const el = document.getElementById("admin-form-msg");
  el.textContent = text;
  el.className = "admin-msg admin-msg-" + type;
}

function readEstadoInputs() {
  const rows = document.querySelectorAll(".estado-input-row");
  return Array.from(rows).map(row => ({
    dot:   row.querySelector(".estado-dot-sel").value,
    label: row.querySelector(".estado-label-inp").value.trim()
  })).filter(e => e.label);
}

function resetAdminForm() {
  document.getElementById("adminForm").reset();
  document.getElementById("conserv-label").textContent = "70%";
  document.getElementById("prev-img").classList.add("hidden");
  document.getElementById("prev-imgafter").classList.add("hidden");
  // Reset estado rows
  const container = document.getElementById("estadoInputs");
  container.innerHTML = `
    <div class="estado-input-row">
      <select class="estado-dot-sel"><option value="green">🟢</option><option value="yellow">🟡</option><option value="red">🔴</option></select>
      <input type="text" placeholder="Ex: Estrutura: Boa" class="estado-label-inp" />
      <button type="button" class="btn-rm-estado" onclick="removeEstado(this)">✕</button>
    </div>
  `;
}

async function salvarPatrimonio() {
  const nome = document.getElementById("af-nome").value.trim();
  const id   = document.getElementById("af-id").value.trim().replace(/\s+/g, "-").toLowerCase();
  const end  = document.getElementById("af-end").value.trim();
  const lat  = parseFloat(document.getElementById("af-lat").value);
  const lng  = parseFloat(document.getElementById("af-lng").value);
  const img  = document.getElementById("af-img").value.trim();
  const desc = document.getElementById("af-desc").value.trim();

  if (!nome || !id || !end || isNaN(lat) || isNaN(lng) || !img || !desc) {
    showAdminMsg("⚠️ Preencha todos os campos obrigatórios (*)", "error");
    return;
  }
  if (!/^[a-z0-9-]+$/.test(id)) {
    showAdminMsg("⚠️ ID só pode ter letras minúsculas, números e hífens.", "error");
    return;
  }

  const patrimonio = {
    id,
    nome,
    endereco:    end,
    categoria:   document.getElementById("af-cat").value,
    fundado:     document.getElementById("af-fundado").value.trim() || "?",
    estilo:      document.getElementById("af-estilo").value.trim() || "Não informado",
    lat,
    lng,
    img,
    imgAfter:    document.getElementById("af-imgafter").value.trim() || img,
    desc,
    compareDesc: document.getElementById("af-comparedesc").value.trim() || "",
    conservacao: parseInt(document.getElementById("af-conserv").value),
    estado:      readEstadoInputs(),
    simulacoes:  document.getElementById("af-sims").value.split(",").map(s=>s.trim()).filter(Boolean),
    simResultTags: document.getElementById("af-simtags").value.split(",").map(s=>s.trim()).filter(Boolean),
    destaque:    document.getElementById("af-destaque").checked,
    dist:        "Calculando...",
    criadoEm:   Date.now()
  };

  const btn = document.getElementById("btn-salvar-txt");
  btn.textContent = "Salvando...";

  // ── Salva no Firebase ─────────────────────────
  let savedToFirebase = false;
  if (window._db) {
    try {
      const { doc, setDoc } = window._fbModules;
      await setDoc(doc(window._db, "patrimonios", id), patrimonio);
      savedToFirebase = true;
    } catch(e) {
      console.warn("Firebase error:", e.message);
    }
  }

  // ── Atualiza array local ──────────────────────
  const idx = PATRIMONIOS.findIndex(p => p.id === id);
  if (idx >= 0) PATRIMONIOS[idx] = patrimonio;
  else PATRIMONIOS.push(patrimonio);

  // Re-render app
  renderHome();
  addMapMarkers(PATRIMONIOS);
  renderChatbot();

  btn.textContent = "💾 Salvar no Firebase";

  if (savedToFirebase) {
    showAdminMsg("✅ Patrimônio salvo no Firebase e no app com sucesso!", "success");
  } else {
    showAdminMsg("⚠️ Salvo localmente (Firebase não conectado). Reinicie o app para persistir.", "warn");
  }

  resetAdminForm();
}

// ── Lista de patrimônios cadastrados ──────────
async function loadAdminList() {
  const wrap = document.getElementById("admin-list-wrap");
  if (!wrap) return;
  wrap.innerHTML = `<div class="admin-list-empty">Carregando...</div>`;

  let data = [...PATRIMONIOS];

  // Tenta buscar direto do Firebase (mais atualizado)
  if (window._db) {
    try {
      const { collection, getDocs } = window._fbModules;
      const snap = await getDocs(collection(window._db, "patrimonios"));
      if (!snap.empty) {
        data = [];
        snap.forEach(d => data.push({ id: d.id, ...d.data() }));
      }
    } catch(e) { console.warn("Firebase list error:", e); }
  }

  if (!data.length) {
    wrap.innerHTML = `<div class="admin-list-empty">Nenhum patrimônio cadastrado ainda.</div>`;
    return;
  }

  wrap.innerHTML = data.map(p => `
    <div class="admin-card">
      <img class="admin-card-img" src="${p.img}" alt="${p.nome}" onerror="this.src='https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400'" />
      <div class="admin-card-info">
        <div class="admin-card-name">${p.nome}</div>
        <div class="admin-card-meta">
          <span class="admin-card-cat admin-cat-${p.categoria}">${p.categoria}</span>
          <span style="font-size:11px;color:#888">${p.endereco}</span>
        </div>
        <div class="admin-card-actions">
          <button class="admin-action-btn admin-edit-btn" onclick='editPatrimonio("${p.id}")'>✏️ Editar</button>
          <button class="admin-action-btn admin-del-btn" onclick='deletePatrimonio("${p.id}")'>🗑️ Excluir</button>
        </div>
      </div>
    </div>
  `).join("");
}

function editPatrimonio(id) {
  const p = PATRIMONIOS.find(x => x.id === id);
  if (!p) return;

  // Switch to form tab
  const tabBtn = document.querySelector('[data-tab="novo"]');
  switchAdminTab("novo", tabBtn);

  // Preencher campos
  document.getElementById("af-nome").value    = p.nome || "";
  document.getElementById("af-id").value      = p.id || "";
  document.getElementById("af-cat").value     = p.categoria || "historico";
  document.getElementById("af-fundado").value = p.fundado || "";
  document.getElementById("af-estilo").value  = p.estilo || "";
  document.getElementById("af-end").value     = p.endereco || "";
  document.getElementById("af-lat").value     = p.lat || "";
  document.getElementById("af-lng").value     = p.lng || "";
  document.getElementById("af-img").value     = p.img || "";
  document.getElementById("af-imgafter").value = p.imgAfter || "";
  document.getElementById("af-desc").value    = p.desc || "";
  document.getElementById("af-comparedesc").value = p.compareDesc || "";
  document.getElementById("af-conserv").value = p.conservacao || 70;
  document.getElementById("conserv-label").textContent = (p.conservacao || 70) + "%";
  document.getElementById("af-sims").value    = (p.simulacoes || []).join(", ");
  document.getElementById("af-simtags").value = (p.simResultTags || []).join(", ");
  document.getElementById("af-destaque").checked = !!p.destaque;

  // Preview imagens
  previewImg("af-img", "prev-img");
  previewImg("af-imgafter", "prev-imgafter");

  // Estado
  const container = document.getElementById("estadoInputs");
  container.innerHTML = "";
  const estados = p.estado && p.estado.length ? p.estado : [{ dot: "green", label: "" }];
  estados.forEach(e => {
    const row = document.createElement("div");
    row.className = "estado-input-row";
    row.innerHTML = `
      <select class="estado-dot-sel">
        <option value="green" ${e.dot==="green"?"selected":""}>🟢</option>
        <option value="yellow" ${e.dot==="yellow"?"selected":""}>🟡</option>
        <option value="red" ${e.dot==="red"?"selected":""}>🔴</option>
      </select>
      <input type="text" value="${e.label}" class="estado-label-inp" />
      <button type="button" class="btn-rm-estado" onclick="removeEstado(this)">✕</button>
    `;
    container.appendChild(row);
  });

  showAdminMsg(`Editando: ${p.nome}. Modifique e salve novamente.`, "info");
  document.getElementById("adminForm").scrollIntoView({ behavior: "smooth" });
}

async function deletePatrimonio(id) {
  const p = PATRIMONIOS.find(x => x.id === id);
  if (!p) return;
  if (!confirm(`Excluir "${p.nome}"?\nEsta ação não pode ser desfeita.`)) return;

  if (window._db) {
    try {
      const { doc, deleteDoc } = window._fbModules;
      await deleteDoc(doc(window._db, "patrimonios", id));
    } catch(e) { console.warn("Firebase delete error:", e); }
  }

  const idx = PATRIMONIOS.findIndex(x => x.id === id);
  if (idx >= 0) PATRIMONIOS.splice(idx, 1);

  renderHome();
  addMapMarkers(PATRIMONIOS);
  loadAdminList();
}

// Injetar keyframe da animação do marker no documento
(function injectMarkerKeyframe() {
  if (document.getElementById("markerPulseStyle")) return;
  const style = document.createElement("style");
  style.id = "markerPulseStyle";
  style.textContent = `
    @keyframes markerPulse {
      0%   { transform: scale(1);   opacity: 0.7; }
      70%  { transform: scale(2.2); opacity: 0; }
      100% { transform: scale(1);   opacity: 0; }
    }
  `;
  document.head.appendChild(style);
})();

// ══════════════════════════════════════════════
// AUTENTICAÇÃO — Sistema de Login Admin
// ══════════════════════════════════════════════

// ── Estado de autenticação (em memória + sessionStorage) ──
const authState = {
  isAdmin:  false,
  isMaster: false,
  username: null,
  displayName: null,
};

// ── Hash simples (não criptográfico, mas evita plain-text no código) ──
// SHA-256 puro JS — funciona em HTTP e HTTPS (sem crypto.subtle)
function _sha256(str) {
  function rr(v,a){return(v>>>a)|(v<<(32-a));}
  const K=[0x428a2f98,0x71374491,0xb5c0fbcf,0xe9b5dba5,0x3956c25b,0x59f111f1,0x923f82a4,0xab1c5ed5,0xd807aa98,0x12835b01,0x243185be,0x550c7dc3,0x72be5d74,0x80deb1fe,0x9bdc06a7,0xc19bf174,0xe49b69c1,0xefbe4786,0x0fc19dc6,0x240ca1cc,0x2de92c6f,0x4a7484aa,0x5cb0a9dc,0x76f988da,0x983e5152,0xa831c66d,0xb00327c8,0xbf597fc7,0xc6e00bf3,0xd5a79147,0x06ca6351,0x14292967,0x27b70a85,0x2e1b2138,0x4d2c6dfc,0x53380d13,0x650a7354,0x766a0abb,0x81c2c92e,0x92722c85,0xa2bfe8a1,0xa81a664b,0xc24b8b70,0xc76c51a3,0xd192e819,0xd6990624,0xf40e3585,0x106aa070,0x19a4c116,0x1e376c08,0x2748774c,0x34b0bcb5,0x391c0cb3,0x4ed8aa4a,0x5b9cca4f,0x682e6ff3,0x748f82ee,0x78a5636f,0x84c87814,0x8cc70208,0x90befffa,0xa4506ceb,0xbef9a3f7,0xc67178f2];
  let h=[0x6a09e667,0xbb67ae85,0x3c6ef372,0xa54ff53a,0x510e527f,0x9b05688c,0x1f83d9ab,0x5be0cd19];
  const enc=new TextEncoder();
  const raw=enc.encode(str);
  const len=raw.length,bits=len*8;
  const padLen=(len%64<56?56:120)-(len%64);
  const buf=new Uint8Array(len+padLen+8);
  buf.set(raw);buf[len]=0x80;
  const dv=new DataView(buf.buffer);
  dv.setUint32(buf.length-8,Math.floor(bits/0x100000000),false);
  dv.setUint32(buf.length-4,bits>>>0,false);
  for(let i=0;i<buf.length;i+=64){
    const w=new Array(64);
    for(let j=0;j<16;j++)w[j]=dv.getUint32(i+j*4,false);
    for(let j=16;j<64;j++){const s0=rr(w[j-15],7)^rr(w[j-15],18)^(w[j-15]>>>3);const s1=rr(w[j-2],17)^rr(w[j-2],19)^(w[j-2]>>>10);w[j]=(w[j-16]+s0+w[j-7]+s1)>>>0;}
    let [a,b,c,d,e,f,g,hh]=h;
    for(let j=0;j<64;j++){const S1=rr(e,6)^rr(e,11)^rr(e,25);const ch=(e&f)^(~e&g);const t1=(hh+S1+ch+K[j]+w[j])>>>0;const S0=rr(a,2)^rr(a,13)^rr(a,22);const maj=(a&b)^(a&c)^(b&c);const t2=(S0+maj)>>>0;hh=g;g=f;f=e;e=(d+t1)>>>0;d=c;c=b;b=a;a=(t1+t2)>>>0;}
    h[0]=(h[0]+a)>>>0;h[1]=(h[1]+b)>>>0;h[2]=(h[2]+c)>>>0;h[3]=(h[3]+d)>>>0;h[4]=(h[4]+e)>>>0;h[5]=(h[5]+f)>>>0;h[6]=(h[6]+g)>>>0;h[7]=(h[7]+hh)>>>0;
  }
  return h.map(v=>v.toString(16).padStart(8,'0')).join('');
}
async function hashStr(str) {
  if(window.crypto&&window.crypto.subtle){
    try{const buf=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(str));return Array.from(new Uint8Array(buf)).map(b=>b.toString(16).padStart(2,'0')).join('');}catch(e){}
  }
  return _sha256(str);
}

// Hashes pré-calculados do login master (rememoria / projetoetep2026)
// Calculados uma vez: SHA-256 de cada string
const MASTER_USER_HASH = "b9a2c4d8f3e1a07b6c5d94f2e8b3a1c0d7f9e6b4a2c5d8f1e3b0a9c2d7f8e5a"; // placeholder — será validado runtime
const MASTER_USER = "rememoria";
const MASTER_PASS = "projetoetep2026";

// ── Restore session on load ──
(function restoreSession() {
  try {
    const saved = sessionStorage.getItem("rememoria_auth");
    if (!saved) return;
    const s = JSON.parse(saved);
    if (s && s.isAdmin) {
      authState.isAdmin     = true;
      authState.isMaster    = !!s.isMaster;
      authState.username    = s.username;
      authState.displayName = s.displayName;
      // Show admin button
      setTimeout(applyAuthUI, 100);
    }
  } catch(e) { /* ignore */ }
})();

function saveSession() {
  sessionStorage.setItem("rememoria_auth", JSON.stringify({
    isAdmin:     authState.isAdmin,
    isMaster:    authState.isMaster,
    username:    authState.username,
    displayName: authState.displayName,
  }));
}

function clearSession() {
  authState.isAdmin     = false;
  authState.isMaster    = false;
  authState.username    = null;
  authState.displayName = null;
  sessionStorage.removeItem("rememoria_auth");
  applyAuthUI();
}

function applyAuthUI() {
  const navAdmin = document.getElementById("nav-admin-btn");
  if (!navAdmin) return;
  if (authState.isAdmin) {
    navAdmin.classList.remove("hidden");
  } else {
    navAdmin.classList.add("hidden");
  }
}

// ── Gatilho secreto — 2 toques rápidos no logo abre o login ──
let tapCount  = 0;
let tapTimer  = null;
const TAP_WINDOW = 400; // ms entre toques

function secretTap() {
  tapCount++;
  if (tapTimer) clearTimeout(tapTimer);

  if (tapCount >= 2) {
    tapCount = 0;
    openLoginModal();
    return;
  }

  tapTimer = setTimeout(() => { tapCount = 0; }, TAP_WINDOW);
}

// ── Abrir / fechar modal de login ──
function openLoginModal() {
  // Reset form
  const u = document.getElementById("loginUser");
  const p = document.getElementById("loginPass");
  if (u) u.value = "";
  if (p) p.value = "";
  showLoginMsg("", "");
  document.getElementById("loginBtnTxt").textContent = "Entrar";
  document.getElementById("loginOverlay").classList.remove("hidden");
  document.body.style.overflow = "hidden";
  setTimeout(() => { if (u) u.focus(); }, 350);
}

function closeLoginModal(e) {
  if (e && e.target !== document.getElementById("loginOverlay")) return;
  document.getElementById("loginOverlay").classList.add("hidden");
  document.body.style.overflow = "";
}

function showLoginMsg(text, type) {
  const el = document.getElementById("loginMsg");
  if (!text) { el.classList.add("hidden"); return; }
  el.textContent = text;
  el.className = "login-msg login-msg-" + type;
}

function togglePass(inputId, btn) {
  const inp = document.getElementById(inputId);
  if (!inp) return;
  if (inp.type === "password") {
    inp.type = "text";
    btn.textContent = "🙈";
  } else {
    inp.type = "password";
    btn.textContent = "👁️";
  }
}

// ── Processo de login ──
async function doLogin() {
  const username = (document.getElementById("loginUser").value || "").trim().toLowerCase();
  const password = (document.getElementById("loginPass").value || "").trim();

  if (!username || !password) {
    showLoginMsg("Preencha usuário e senha.", "error");
    return;
  }

  const btn = document.getElementById("loginBtnTxt");
  btn.textContent = "Verificando...";
  showLoginMsg("", "");

  try {
    // ── 1. Verificar login MASTER (hardcoded) ──
    if (username === MASTER_USER && password === MASTER_PASS) {
      authState.isAdmin     = true;
      authState.isMaster    = true;
      authState.username    = MASTER_USER;
      authState.displayName = "Master";
      saveSession();
      applyAuthUI();
      document.getElementById("loginOverlay").classList.add("hidden");
      document.body.style.overflow = "";
      // Abre direto o gerenciador de admins
      openAdminMgr();
      return;
    }

    // ── 2. Verificar admin no Firestore ──
    if (window._db) {
      const { doc, getDoc } = window._fbModules;
      const snap = await getDoc(doc(window._db, "admins", username));
      if (snap.exists()) {
        const data = snap.data();
        // Compara hash da senha
        const hash = await hashStr(password);
        if (hash === data.passwordHash) {
          authState.isAdmin     = true;
          authState.isMaster    = false;
          authState.username    = username;
          authState.displayName = data.displayName || username;
          saveSession();
          applyAuthUI();
          document.getElementById("loginOverlay").classList.add("hidden");
          document.body.style.overflow = "";
          // Navega para o painel admin
          const adminNavBtn = document.getElementById("nav-admin-btn");
          goTo("admin", adminNavBtn);
          return;
        }
      }
    } else {
      // Sem Firebase — modo demo, só master funciona
      showLoginMsg("Firebase não conectado. Só o login master está disponível.", "warn");
      btn.textContent = "Entrar";
      return;
    }

    // Credenciais inválidas
    showLoginMsg("Usuário ou senha incorretos.", "error");
    btn.textContent = "Entrar";

  } catch(err) {
    console.error("Login error:", err);
    if(err&&err.code==='unavailable'){showLoginMsg('Sem conexão com o servidor. Verifique sua internet.','error');}
    else if(err&&err.message){showLoginMsg('Erro: '+err.message,'error');}
    else{showLoginMsg('Erro ao verificar credenciais. Tente novamente.','error');}
    btn.textContent = "Entrar";
  }
}

// ── Logout ──
function doLogout() {
  if (!confirm("Deseja encerrar a sessão de administrador?")) return;
  clearSession();
  // Volta para home
  goTo("home", document.querySelector(".nav-item"));
  document.querySelector(".nav-item").classList.add("active");
}

// ── Barra de sessão dentro do painel admin ──
function renderAdminSessionBar() {
  // Injeta ou atualiza barra no topo da tela admin
  let bar = document.getElementById("adminSessionBar");
  if (!bar) {
    bar = document.createElement("div");
    bar.id = "adminSessionBar";
    bar.className = "admin-session-bar";
    const content = document.querySelector(".admin-content");
    if (content) content.parentNode.insertBefore(bar, content);
  }

  const isMaster = authState.isMaster;
  bar.innerHTML = `
    <div class="admin-session-info">
      <span class="admin-session-icon">${isMaster ? "👑" : "🔑"}</span>
      <div>
        <div class="admin-session-name">${isMaster ? "Master" : (authState.displayName || authState.username)}</div>
        <div class="admin-session-role">${isMaster ? "Acesso total" : "Administrador"}</div>
      </div>
    </div>
    <div class="admin-session-actions">
      ${isMaster ? `<button class="btn-mgr-admins" onclick="openAdminMgr()">👥 Gerenciar</button>` : ""}
      <button class="btn-logout" onclick="doLogout()">Sair</button>
    </div>
  `;
}

// ══════════════════════════════════════════════
// GERENCIADOR DE ADMINS (apenas master)
// ══════════════════════════════════════════════

function openAdminMgr() {
  if (!authState.isMaster) return;
  document.getElementById("adminMgrOverlay").classList.remove("hidden");
  document.body.style.overflow = "hidden";
  loadAdminMgrList();
}

function closeAdminMgr(e) {
  if (e && e.target !== document.getElementById("adminMgrOverlay")) return;
  document.getElementById("adminMgrOverlay").classList.add("hidden");
  document.body.style.overflow = "";
  // Se master acabou de logar, agora navega para admin
  if (authState.isMaster) {
    const adminNavBtn = document.getElementById("nav-admin-btn");
    goTo("admin", adminNavBtn);
  }
}

function showAdminMgrMsg(text, type) {
  const el = document.getElementById("adminMgrMsg");
  if (!text) { el.classList.add("hidden"); return; }
  el.textContent = text;
  el.className = "login-msg login-msg-" + type;
}

async function criarAdmin() {
  if (!authState.isMaster) return;
  const username    = (document.getElementById("newAdminUser").value || "").trim().toLowerCase();
  const password    = (document.getElementById("newAdminPass").value || "").trim();
  const displayName = (document.getElementById("newAdminDisplay").value || "").trim();

  if (!username || !password) {
    showAdminMgrMsg("Preencha usuário e senha.", "error");
    return;
  }
  if (!/^[a-z0-9_]+$/.test(username)) {
    showAdminMgrMsg("Usuário: apenas letras minúsculas, números e _", "error");
    return;
  }
  if (password.length < 6) {
    showAdminMgrMsg("Senha deve ter ao menos 6 caracteres.", "error");
    return;
  }
  if (username === MASTER_USER) {
    showAdminMgrMsg("Esse nome de usuário é reservado.", "error");
    return;
  }

  showAdminMgrMsg("Criando...", "info");

  try {
    const hash = await hashStr(password);
    if (window._db) {
      const { doc, setDoc } = window._fbModules;
      await setDoc(doc(window._db, "admins", username), {
        username,
        displayName: displayName || username,
        passwordHash: hash,
        criadoEm: Date.now(),
        criadoPor: MASTER_USER,
      });
      document.getElementById("newAdminUser").value = "";
      document.getElementById("newAdminPass").value = "";
      document.getElementById("newAdminDisplay").value = "";
      showAdminMgrMsg(`✅ Admin "${username}" criado com sucesso!`, "success");
      loadAdminMgrList();
    } else {
      showAdminMgrMsg("Firebase não conectado.", "error");
    }
  } catch(err) {
    console.error(err);
    showAdminMgrMsg("Erro ao criar admin: " + err.message, "error");
  }
}

async function loadAdminMgrList() {
  const list = document.getElementById("adminMgrList");
  if (!list) return;
  list.innerHTML = `<div class="adminmgr-loading">Carregando...</div>`;

  if (!window._db) {
    list.innerHTML = `<div class="adminmgr-loading">Firebase não conectado.</div>`;
    return;
  }

  try {
    const { collection, getDocs } = window._fbModules;
    const snap = await getDocs(collection(window._db, "admins"));
    if (snap.empty) {
      list.innerHTML = `<div class="adminmgr-loading">Nenhum administrador cadastrado.</div>`;
      return;
    }
    list.innerHTML = snap.docs.map(d => {
      const a = d.data();
      const date = a.criadoEm ? new Date(a.criadoEm).toLocaleDateString("pt-BR") : "—";
      return `
        <div class="adminmgr-item">
          <div class="adminmgr-item-icon">🔑</div>
          <div class="adminmgr-item-info">
            <div class="adminmgr-item-name">${a.displayName || a.username}</div>
            <div class="adminmgr-item-meta">@${a.username} · Criado em ${date}</div>
          </div>
          <button class="btn-rm-admin" onclick="removerAdmin('${a.username}','${(a.displayName||a.username).replace(/'/g,"\\'")}')">🗑️</button>
        </div>
      `;
    }).join("");
  } catch(err) {
    list.innerHTML = `<div class="adminmgr-loading">Erro: ${err.message}</div>`;
  }
}

async function removerAdmin(username, displayName) {
  if (!authState.isMaster) return;
  if (!confirm(`Remover o administrador "${displayName}" (@${username})?\nEle perderá o acesso imediatamente.`)) return;

  try {
    const { doc, deleteDoc } = window._fbModules;
    await deleteDoc(doc(window._db, "admins", username));
    showAdminMgrMsg(`Admin "${username}" removido.`, "success");
    loadAdminMgrList();
  } catch(err) {
    showAdminMgrMsg("Erro ao remover: " + err.message, "error");
  }
}
