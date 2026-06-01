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
  setTimeout(initApp, 1800);
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
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.querySelectorAll(".nav-item").forEach(b => b.classList.remove("active"));
  document.getElementById("screen-" + screen).classList.add("active");
  if (btn) btn.classList.add("active");

  if (screen === "mapa" && mapInstance) {
    setTimeout(() => mapInstance.invalidateSize(), 100);
  }
  if (screen === "favoritos") renderFavs();
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

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 19
  }).addTo(mapInstance);

  L.control.zoom({ position: "bottomright" }).addTo(mapInstance);

  addMapMarkers(PATRIMONIOS);
}

function addMapMarkers(data) {
  // Remove existing
  mapMarkers.forEach(m => mapInstance.removeLayer(m));
  mapMarkers = [];

  data.forEach(p => {
    const emojiMap = { historico: "🏛️", cultural: "🎭", natural: "🌿" };
    const colorMap = { historico: "#6B1A2A", cultural: "#7D3A8A", natural: "#3A7D44" };
    const emoji  = emojiMap[p.categoria]  || "📍";
    const color  = colorMap[p.categoria]  || "#6B1A2A";

    const icon = L.divIcon({
      className: "",
      html: `<div style="
        width:38px;height:38px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);
        background:${color};border:2.5px solid white;
        display:flex;align-items:center;justify-content:center;
        box-shadow:0 3px 10px rgba(0,0,0,.35);
      "><span style="transform:rotate(45deg);font-size:16px">${emoji}</span></div>`,
      iconSize: [38, 38],
      iconAnchor: [19, 38],
      popupAnchor: [0, -40]
    });

    const popup = L.popup({ closeButton: false, maxWidth: 220 }).setContent(`
      <div class="map-popup">
        <img src="${p.img}" alt="${p.nome}" onerror="this.src='https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400'">
        <div class="map-popup-body">
          <div class="map-popup-name">${p.nome}</div>
          <div class="map-popup-addr">${p.endereco}</div>
        </div>
        <button class="map-popup-btn" onclick="openModalById('${p.id}')">Ver detalhes</button>
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
