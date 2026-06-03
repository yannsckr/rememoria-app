/* ═══════════════════════════════════════════════
   ReMemória — App Logic (Versão Final c/ Admin)
═══════════════════════════════════════════════ */

// ── Dados dos patrimônios ──────────────────────
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
    desc: "O Museu Municipal de São José dos Campos é um dos mais importantes centros culturais da cidade. Inaugurado in 1927, preserva vasto acervo histórico e cultural da região do Vale do Paraíba.",
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
    desc: "A Igreja São Benedito é um dos monumentos mais antigos de São José dos Campos. Construída em meados do século XVIII, representa a fé e a história da comunidade afrodescendente local.",
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
    desc: "O Centro Cultural de São José dos Campos é o principal espaço dedicado às artes e à cultura na cidade. Promove exposições, espetáculos e oficinas ao longo do ano.",
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
    desc: "O Parque Vicentina Aranha é um refúgio verde no coração de São José dos Campos. Tombado como patrimônio natural, abriga exemplares centenários da Mata Atlântica.",
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
    desc: "O Teatro Municipal é o principal palco das artes cênicas em São José dos Campos. Com arquitetura art déco dos anos 60, recebeu grandes nomes da cultura brasileira.",
    conservacao: 72
  }
];

// ── Categorias Globais Dinâmicas ────────────────
let CATEGORIAS = [
  { value: "historico", label: "Histórico", emoji: "🏛️", color: "#6B1A2A", accent: "#C4973A", ring: "rgba(107,26,42,0.25)" },
  { value: "cultural",  label: "Cultural",  emoji: "🎭", color: "#5A2775", accent: "#C484E8", ring: "rgba(90,39,117,0.25)" },
  { value: "natural",   label: "Natural",   emoji: "🌿", color: "#1A5C2A", accent: "#5CB86E", ring: "rgba(26,92,42,0.25)" }
];

// ── Estado global ──────────────────────────────
let userLocation = null;
let currentPatrimonio = null;
let favorites = JSON.parse(localStorage.getItem("rememoria_favs") || "[]");
let visited   = JSON.parse(localStorage.getItem("rememoria_vis")  || "[]");
let activeSimBtn = null;

let mapInstance = null;
let mapMarkers  = [];
let camadaPadrao;
let camadaSatelite;

// ══════════════════════════════════════════════
// INIT 
// ══════════════════════════════════════════════
window.addEventListener("DOMContentLoaded", () => {
  setTimeout(initApp, 5000);
  initScrollAnimation();
});

async function initApp() {
  document.getElementById("splash").style.display = "none";
  document.getElementById("app").classList.remove("hidden");

  renderCategoriasUI();
  requestLocation();
  renderHome();
  initMap();
  renderChatbot(); 
  renderFavs();
  updateProfileStats();

    if (window._db) {
    try {
      const { collection, getDocs } = window._fbModules;
      const snap = await getDocs(collection(window._db, "patrimonios"));
      if (!snap.empty) {
        PATRIMONIOS.length = 0;
        snap.forEach(doc => PATRIMONIOS.push({ id: doc.id, ...doc.data() }));
        renderHome();
        if (mapInstance) addMapMarkers(PATRIMONIOS);
        
        // CORREÇÃO AQUI: Atualiza o menu da IA com os dados recém-chegados do Firebase
        updateChatbotOptions();
      }
    } catch(e) {
      console.warn("Usando dados locais:", e.message);
    }
  }
}

// ══════════════════════════════════════════════
// LOCALIZAÇÃO E DISTÂNCIA
// ══════════════════════════════════════════════
function calcDist(lat1, lng1, lat2, lng2) {
  const R = 6371000;
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

  if (localStorage.getItem("rememoria_gps_permitido") === "true") {
    executarGpsNativo();
    return;
  }

  const ultimaRecusa = localStorage.getItem("rememoria_gps_recusa_time");
  const cincoDias = 5 * 24 * 60 * 60 * 1000;
  
  if (ultimaRecusa && (Date.now() - parseInt(ultimaRecusa, 10) < cincoDias)) {
    console.log("GPS: Pop-up ocultado para não incomodar o usuário esta semana.");
    return;
  }

  document.getElementById("locationPermissionOverlay").classList.remove("hidden");
}

function executarGpsNativo() {
  navigator.geolocation.getCurrentPosition(pos => {
    userLocation = { lat: pos.coords.latitude, lng: pos.coords.longitude };
    renderHome();
    if (mapInstance) addMapMarkers(PATRIMONIOS);
  }, () => {}, { enableHighAccuracy: false, timeout: 8000 });
}

function acceptLocationPrompt() {
  localStorage.setItem("rememoria_gps_permitido", "true");
  document.getElementById("locationPermissionOverlay").classList.add("hidden");
  executarGpsNativo();
}

function closeLocationPrompt(e) {
  if (e && e.target !== document.getElementById("locationPermissionOverlay")) return;
  localStorage.setItem("rememoria_gps_recusa_time", Date.now().toString());
  document.getElementById("locationPermissionOverlay").classList.add("hidden");
}

// ══════════════════════════════════════════════
// NAVEGAÇÃO
// ══════════════════════════════════════════════
function goTo(screen, btn) {
  closeBusca(); 
  if (screen === "admin" && !authState.isAdmin) {
    openLoginModal();
    return;
  }
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.querySelectorAll(".nav-item").forEach(b => b.classList.remove("active"));
  document.getElementById("screen-" + screen).classList.add("active");
  if (btn) btn.classList.add("active");

  const navBar = document.querySelector('.bottom-nav');
  if (navBar) navBar.classList.remove('nav-hidden');

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

  let nearby = [...data];
  if (userLocation) {
    nearby.forEach(p => p._dist = calcDist(userLocation.lat, userLocation.lng, p.lat, p.lng));
    nearby.sort((a, b) => a._dist - b._dist);
  }
  nearby = nearby.slice(0, 4);
  document.getElementById("nearbyList").innerHTML = nearby.map(p => {
    const distLabel = (userLocation && p._dist != null) ? formatDist(p._dist) : p.dist;
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
// MAPA 
// ══════════════════════════════════════════════
function initMap() {
  mapInstance = L.map("map", {
    center: [-23.1794, -45.8847],
    zoom: 15,
    zoomControl: false
  });

  camadaPadrao = L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
    attribution: '© OpenStreetMap contributors © CARTO',
    maxZoom: 19
  });

  camadaSatelite = L.tileLayer('https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
    attribution: '© Google Maps',
    maxZoom: 19
  });

  camadaPadrao.addTo(mapInstance);
  L.control.zoom({ position: "bottomright" }).addTo(mapInstance);

  addMapMarkers(PATRIMONIOS);
}

function toggleMapSettings() {
  const menu = document.getElementById('mapSettingsMenu');
  if (menu) menu.classList.toggle('hidden');
}

function changeMapStyle(estilo) {
  if (!mapInstance) return;
  
  if (estilo === 'padrao') {
    if (!mapInstance.hasLayer(camadaPadrao)) {
      camadaPadrao.addTo(mapInstance);
    }
    if (mapInstance.hasLayer(camadaSatelite)) {
      mapInstance.removeLayer(camadaSatelite);
    }
    document.getElementById('btnMapPadrao')?.classList.add('active');
    document.getElementById('btnMapSatelite')?.classList.remove('active');
  } else {
    if (!mapInstance.hasLayer(camadaSatelite)) {
      camadaSatelite.addTo(mapInstance);
    }
    if (mapInstance.hasLayer(camadaPadrao)) {
      mapInstance.removeLayer(camadaPadrao);
    }
    document.getElementById('btnMapSatelite')?.classList.add('active');
    document.getElementById('btnMapPadrao')?.classList.remove('active');
  }
  
  toggleMapSettings();
}

function addMapMarkers(data) {
  mapMarkers.forEach(m => mapInstance.removeLayer(m));
  mapMarkers = [];

  data.forEach(p => {
    const cfg = CATEGORIAS.find(c => c.value === p.categoria) || {
      emoji: "📍",
      color: "#6B1A2A",
      accent: "#C4973A",
      ring: "rgba(107,26,42,0.25)",
      label: p.categoria
    };

    const icon = L.divIcon({
      className: "",
      html: `
        <div style="position:relative;width:52px;height:62px;">
          <div style="position:absolute;top:4px;left:4px;width:44px;height:44px;border-radius:50%;background:${cfg.ring};animation:markerPulse 2.4s ease-out infinite;"></div>
          <div style="position:absolute;top:0;left:0;width:44px;height:44px;border-radius:50% 50% 50% 4px;background:linear-gradient(145deg,${cfg.color},${cfg.color}cc);border:3px solid white;box-shadow:0 6px 20px rgba(0,0,0,.35),0 2px 6px rgba(0,0,0,.2);display:flex;align-items:center;justify-content:center;transform:rotate(-45deg);">
            <span style="transform:rotate(45deg);font-size:18px;line-height:1;">${cfg.emoji}</span>
          </div>
          <div style="position:absolute;bottom:0;left:50%;transform:translateX(-50%);width:4px;height:16px;background:linear-gradient(to bottom,${cfg.color},transparent);border-radius:0 0 4px 4px;"></div>
          <div style="position:absolute;top:-2px;right:0;width:12px;height:12px;border-radius:50%;background:${cfg.accent};border:2px solid white;box-shadow:0 2px 4px rgba(0,0,0,.3);"></div>
        </div>
      `,
      iconSize: [52, 62],
      iconAnchor: [26, 62],
      popupAnchor: [0, -64]
    });

    const conservColor = p.conservacao >= 80 ? "#3A7D44" : p.conservacao >= 60 ? "#C4973A" : "#C43A3A";
    const catLabel = cfg.label || p.categoria;
    const catEmoji = cfg.emoji || "📍";

    let distHtml = "";
    if (userLocation && p.lat && p.lng) {
      const d = calcDist(userLocation.lat, userLocation.lng, p.lat, p.lng);
      distHtml = `<div style="font-size:11px; color:var(--wine); font-weight:700; margin-bottom:10px;">📍 ${formatDist(d)}</div>`;
    }

      const popup = L.popup({ closeButton: false, maxWidth: 240, className: "rememoria-popup" }).setContent(`
      <div class="map-popup">
        <div class="map-popup-img-wrap">
          <img src="${p.img}" alt="${p.nome}" onerror="this.src='https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400'">
          <div class="map-popup-cat-badge">${catEmoji} ${catLabel}</div>
        </div>
        <div class="map-popup-body">
          <div class="map-popup-name">${p.nome}</div>
          <div class="map-popup-addr" style="margin-bottom: 8px;">${p.endereco}</div>
          ${distHtml}
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
  const filtered = cat === "all" ? PATRIMONIOS : PATRIMONIOS.filter(p => p.categoria === cat || (p.categoriasExtras && p.categoriasExtras.includes(cat)));
  addMapMarkers(filtered);
}

function locateUser() {
  if (!navigator.geolocation) { alert("Geolocalização não suportada."); return; }
  navigator.geolocation.getCurrentPosition(pos => {
    mapInstance.flyTo([pos.coords.latitude, pos.coords.longitude], 15);
  }, () => { alert("Não foi possível obter sua localização."); });
}

// ══════════════════════════════════════════════
// MODAL DETALHE & COMPARAÇÃO
// ══════════════════════════════════════════════
function openModalById(id) {
  const p = PATRIMONIOS.find(x => x.id === id);
  if (p) openModal(p);
}

function openModal(p) {
  currentPatrimonio = p;
  activeSimBtn = null;

  const mImg = document.getElementById("mImg");
  if (mImg) mImg.src = p.img;
  
  const mTitle = document.getElementById("mTitle");
  if (mTitle) mTitle.textContent = p.nome;
  
  const mAddr = document.getElementById("mAddr");
  if (mAddr) {
    mAddr.textContent = p.endereco;
    if (userLocation && p.lat && p.lng) {
      const d = calcDist(userLocation.lat, userLocation.lng, p.lat, p.lng);
      mAddr.textContent = p.endereco + " · " + formatDist(d);
    }
  }
  
  const cfgCat = CATEGORIAS.find(c => c.value === p.categoria) || { emoji: "📍", label: p.categoria };
  const mTags = document.getElementById("mTags");
  if (mTags) mTags.innerHTML = `<span class="tag">${cfgCat.emoji} ${cfgCat.label}</span><span class="tag">📅 Fundado em ${p.fundado}</span><span class="tag">🏗️ ${p.estilo}</span>`;

  const mConserv = document.getElementById("mConservPercent");
  if (mConserv) mConserv.textContent = `Índice: ${p.conservacao || 0}%`;

  const estado = Array.isArray(p.estado) ? p.estado : [];
  const mEstado = document.getElementById("mEstado");
  if (mEstado) mEstado.innerHTML = estado.map(e => `<div class="estado-item"><div class="dot dot-${e.dot}"></div><span>${e.label}</span></div>`).join("");
  
  const mDesc = document.getElementById("mDesc");
  if (mDesc) mDesc.textContent = p.desc || "";

  const simulacoes = Array.isArray(p.simulacoes) ? p.simulacoes : [];
  const simCard = document.getElementById("mSimCard");
  if (simCard) {
    if (simulacoes.length > 0) {
      simCard.style.display = "block";
      const mSimBtns = document.getElementById("mSimBtns");
      if (mSimBtns) mSimBtns.innerHTML = simulacoes.map(s => `<button class="sim-btn" onclick="selectSim(this,'${s}')">${s}</button>`).join("");
      
      const simResultTags = Array.isArray(p.simResultTags) ? p.simResultTags : [];
      const mSimTags = document.getElementById("mSimTags");
      if (mSimTags) mSimTags.innerHTML = simResultTags.map(t => `<span class="sim-tag">${t}</span>`).join("");
    } else {
      simCard.style.display = "none";
    }
  }

  const hasMat = !!p.materiais;
  const hasTec = !!p.tecnicas;
  const hasNot = !!p.notas;
  
  const btnMat = document.getElementById("btnTechMat");
  if (btnMat) btnMat.style.display = hasMat ? "flex" : "none";
  
  const btnTec = document.getElementById("btnTechConstr");
  if (btnTec) btnTec.style.display = hasTec ? "flex" : "none";
  
  const btnNot = document.getElementById("btnTechNotas");
  if (btnNot) btnNot.style.display = hasNot ? "flex" : "none";
  
  const techWrap = document.getElementById("mTechInfoWrap");
  if (techWrap) techWrap.style.display = (hasMat || hasTec || hasNot) ? "block" : "none";

  updateFavBtn();
  if (!visited.includes(p.id)) {
    visited.push(p.id);
    localStorage.setItem("rememoria_vis", JSON.stringify(visited));
    updateProfileStats();
  }

  const overlay = document.getElementById("modalOverlay");
  if (overlay) {
    overlay.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }
}

function openTechPopup(title, text) {
  document.getElementById("techPopupTitle").textContent = title;
  document.getElementById("techPopupText").textContent = text;
  document.getElementById("techPopupOverlay").classList.remove("hidden");
}

function closeTechPopup(e) {
  if (e && e.target !== document.getElementById("techPopupOverlay")) return;
  document.getElementById("techPopupOverlay").classList.add("hidden");
}

function closeModal(e) {
  if (e && e.target !== document.getElementById("modalOverlay")) return;
  document.getElementById("modalOverlay").classList.add("hidden");
  document.body.style.overflow = "";
}

function toggleFav() {
  if (!currentPatrimonio) return;
  const id = currentPatrimonio.id;
  if (favorites.includes(id)) favorites = favorites.filter(f => f !== id);
  else favorites.push(id);
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

function selectSim(btn, name) {
  document.querySelectorAll(".sim-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  activeSimBtn = name;
}

function applySimulation() {
  if (!activeSimBtn) { document.querySelector(".sim-btn")?.click(); return; }
  alert(`Simulação "${activeSimBtn}" aplicada com sucesso!`);
}

function show3D() { 
  openTechPopup("Visualização 3D 🌐", "Estamos preparando a visualização 3D! Em breve você poderá desfrutar desta experiência :)"); 
}

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

let sliderDragging = false;
function initSlider() {
  const divider = document.getElementById("compareDivider");
  const slider  = document.getElementById("compareSlider");
  const after   = document.querySelector(".compare-after");
  setSlider(0.5, after, divider);
  divider.addEventListener("mousedown", startDrag);
  window.addEventListener("mousemove", onDrag);
  window.addEventListener("mouseup", stopDrag);
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
function removeSlider() { sliderDragging = false; }

// ══════════════════════════════════════════════
// IA CHATBOT
// ══════════════════════════════════════════════
let chatSelectedPatrimonio = null;
let chatHistory = [];

function renderChatbot() {
  const container = document.getElementById("ia-chatbot-wrap");
  if (!container) return;

  const options = PATRIMONIOS.map(p => `<option value="${p.id}">${p.nome}</option>`).join("");

  container.innerHTML = `
    <div class="chatbot-wrap">
      <div class="chatbot-header">
        <div class="chatbot-avatar" style="background: transparent; overflow: hidden;">
          <img src="icon-avatar-ia.png" alt="Memo" style="width: 100%; height: 100%; object-fit: cover;" />
        </div>
        <div class="chatbot-header-info">
          <h4>Memo</h4>
          <span>Seu guia de exploração histórica</span>
        </div>
      </div>
      <div class="chatbot-patrimonio-selector">
        <label>Patrimônio selecionado</label>
        <select id="chatPatrimSelect" onchange="selectChatpatrimonio(this.value)">
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
        <div class="chat-msg bot">Olá! Eu sou o Memo, seu guia virtual. Escolha um patrimônio aqui em cima e vamos explorar a história dele juntos! 🏛️✨</div>
      </div>
      <div class="chatbot-input-row">
        <input class="chatbot-input" id="chatInput" type="text" placeholder="Pergunte sobre o patrimônio..." onkeydown="if(event.key==='Enter') sendChat()" />
        <button class="chatbot-send" onclick="sendChat()">➤</button>
      </div>
    </div>
  `;
}

function updateChatbotOptions() {
  const select = document.getElementById("chatPatrimSelect");
  if (!select) return;
  
  const currentVal = select.value;
  const options = PATRIMONIOS.map(p => `<option value="${p.id}">${p.nome}</option>`).join("");
  
  select.innerHTML = `<option value="">— Escolha um patrimônio —</option>` + options;
  
  // Se já havia algo selecionado e ele ainda existe no banco, mantém a seleção
  if (currentVal && PATRIMONIOS.some(p => p.id === currentVal)) {
    select.value = currentVal;
  }
}

function selectChatpatrimonio(id) {
  chatSelectedPatrimonio = PATRIMONIOS.find(p => p.id === id) || null;
  chatHistory = []; 
  const msgs = document.getElementById("chatMessages");
  if (!msgs) return;
  
  if (chatSelectedPatrimonio) {
    msgs.innerHTML = `<div class="chat-msg bot">Excelente escolha! O que você quer descobrir sobre <strong>${chatSelectedPatrimonio.nome}</strong>? Pode me perguntar qualquer curiosidade! 🗺️</div>`;
  } else {
    msgs.innerHTML = `<div class="chat-msg bot">Para começarmos nossa viagem no tempo, selecione um patrimônio acima! 😊</div>`;
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

  const typingId = "typing-" + Date.now();
  msgs.innerHTML += `<div class="chat-msg typing" id="${typingId}">digitando...</div>`;
  msgs.scrollTop = msgs.scrollHeight;

  const p = chatSelectedPatrimonio;
  
  const systemPrompt = `Você é um assistente do ReMemória. Responda em pt-BR sobre o patrimônio: ${p.nome}. O endereço dele é: ${p.endereco}. Categoria: ${p.categoria}. Conservação: ${p.conservacao}%. Descrição: ${p.desc}. Seja amigável e informe o endereço se o usuário perguntar como chegar.`;

  try {
    const messages = chatHistory.slice(-8);

    const backendUrl = window.location.port === "5500" 
      ? `http://${window.location.hostname}:4000/api/chat` 
      : "/api/chat";

    const response = await fetch(backendUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ system: systemPrompt, messages: messages })
    });

    const data = await response.json();
    const typingEl = document.getElementById(typingId);
    if (typingEl) typingEl.remove();

    if (data.reply) {
      appendChatMsg(msgs, "bot", data.reply);
      chatHistory.push({ role: "assistant", content: data.reply });
    } else {
      appendChatMsg(msgs, "bot", "Desculpe, não consegui obter uma resposta.");
    }
  } catch (err) {
    const typingEl = document.getElementById(typingId);
    if (typingEl) typingEl.remove();
    appendChatMsg(msgs, "bot", "Erro de conexão com o servidor. Tente novamente.");
    console.error(err);
  }
}

function appendChatMsg(container, type, text) {
  const div = document.createElement("div");
  div.className = `chat-msg ${type}`;
  div.innerHTML = text;
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

function sendChatSuggestion(text) {
  const input = document.getElementById("chatInput");
  if (!input) return;
  input.value = text;
  sendChat(); 
}

// ══════════════════════════════════════════════
// ABA FAVORITOS E PERFIL
// ══════════════════════════════════════════════
function renderFavs() {
  const favList = document.getElementById("favList");
  const favData = PATRIMONIOS.filter(p => favorites.includes(p.id));
  if (!favData.length) {
    favList.innerHTML = `<div class="empty-state"><div class="empty-icon">⭐</div><p>Nenhum favorito ainda.<br/>Explore e salve patrimônios!</p></div>`;
    return;
  }
  favList.innerHTML = favData.map(p => `
    <div class="list-item" onclick='openModalById("${p.id}")'>
      <img class="list-img" src="${p.img}" alt="${p.nome}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400'">
      <div class="list-info">
        <div class="list-name">${p.nome}</div>
        <div class="list-addr">${p.endereco}</div>
      </div>
      <span class="list-arrow">›</span>
    </div>
  `).join("");
}

function updateProfileStats() {
  document.getElementById("statVisited").textContent = visited.length;
  document.getElementById("statFav").textContent = favorites.length;
}

// ══════════════════════════════════════════════
// SCROLL ANIMATION (BARRA INFERIOR)
// ══════════════════════════════════════════════
function initScrollAnimation() {
  const navBar = document.querySelector('.bottom-nav');
  const screens = document.querySelectorAll('.screen');

  if (!navBar) return;

  screens.forEach(screen => {
    let isScrolling = false;
    
    screen.addEventListener('scroll', () => {
      if (!isScrolling) {
        window.requestAnimationFrame(() => {
          let currentScrollY = screen.scrollTop;
          
          if (currentScrollY > 40) {
            navBar.classList.add('nav-hidden');
          } else {
            navBar.classList.remove('nav-hidden');
          }
          isScrolling = false;
        });
        isScrolling = true;
      }
    }, { passive: true }); 
  });
}

(function injectMarkerKeyframe() {
  if (document.getElementById("markerPulseStyle")) return;
  const style = document.createElement("style");
  style.id = "markerPulseStyle";
  style.textContent = `@keyframes markerPulse { 0% { transform: scale(1); opacity: 0.7; } 70% { transform: scale(2.2); opacity: 0; } 100% { transform: scale(1); opacity: 0; } }`;
  document.head.appendChild(style);
})();

// ══════════════════════════════════════════════
// TELA DE BUSCA AVANÇADA (SLIDE)
// ══════════════════════════════════════════════
function openBusca() {
  document.getElementById("buscaScreen").classList.add("active");
  renderBuscaAvancada(); 
  setTimeout(() => document.getElementById("buscaInputAvancada").focus(), 350);
}

function filterBuscaAvancada(val) {
  renderBuscaAvancada(val);
}

function closeBusca() {
  document.getElementById("buscaScreen").classList.remove("active");
}



/* =======================================================
   INTERCEPTADOR GLOBAL DE POP-UPS (ALERTS) ATUALIZADO
   ======================================================= */
window.alert = function(mensagem) {
  if (mensagem === "Em breve!") {
    mensagem = "Estamos preparando essa experiência para você! :)";
  }
  openTechPopup("ReMemória 🏛️", mensagem);
};

/* =======================================================
   FUNÇÕES PARA GERENCIAR O POP-UP "SOBRE O PROJETO"
   ======================================================= */
function openSobreProjeto() {
  document.getElementById("sobreProjetoOverlay").classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeSobreProjeto(e) {
  if (e && e.target !== document.getElementById("sobreProjetoOverlay")) return;
  document.getElementById("sobreProjetoOverlay").classList.add("hidden");
  document.body.style.overflow = "";
}

function setBuscaFilter(btn) {
  document.querySelectorAll(".busca-filter-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
}

function renderBuscaAvancada(query = "") {
  let data = PATRIMONIOS;
  if (query) {
    data = data.filter(p => p.nome.toLowerCase().includes(query.toLowerCase()) || p.categoria.toLowerCase().includes(query.toLowerCase()));
  }
  
  const container = document.getElementById("buscaContentAvançada");
  if (!container) return; 

  const destaque = data.find(p => p.destaque) || data[0];
  const lista = data.filter(p => p.id !== destaque?.id);

  let html = "";
  if (destaque) {
    html += `
      <div class="busca-feat-card" onclick='openModalById("${destaque.id}")'>
        <div class="busca-feat-icon" style="background-image: url('${destaque.img}'); background-size: cover; background-position: center;"></div>
        <div class="busca-feat-info">
          <span class="hero-badge" style="background:#C4973A;color:#4A0F1E;padding:4px 10px;font-size:10px;border-radius:6px;font-weight:700;">DESTAQUE</span>
          <h3>${destaque.nome}</h3>
          <div class="busca-feat-meta">
            <span>📍 ${destaque.endereco.split(",")[0] || destaque.endereco}</span>
            <span>⏱️ Fund. ${destaque.fundado}</span>
          </div>
        </div>
      </div>
    `;
  }

  html += `<div class="busca-list">`;
  html += lista.map(p => `
    <div class="busca-list-item" onclick='openModalById("${p.id}")'>
      <div class="busca-list-icon" style="background-image: url('${p.img}'); background-size: cover; background-position: center; border: none;"></div>
      <div class="busca-list-info">
        <h4>${p.nome}</h4>
        <div class="busca-list-meta">
          <span>📍 ${p.endereco.split("—")[1] || "S. J. dos Campos"}</span>
          <span>⏱️ Fund. ${p.fundado}</span>
        </div>
      </div>
      <div class="busca-list-arrow">›</div>
    </div>
  `).join("");
  html += `</div>`;

  container.innerHTML = html;
}

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

const MASTER_USER_HASH = "b9a2c4d8f3e1a07b6c5d94f2e8b3a1c0d7f9e6b4a2c5d8f1e3b0a9c2d7f8e5a"; 
const MASTER_USER = "rememoria";
const MASTER_PASS = "projetoetep2026";

const authState = {
  isAdmin:  false,
  isMaster: false,
  username: null,
  displayName: null,
};

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
      setTimeout(applyAuthUI, 100);
    }
  } catch(e) {}
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

let tapCount  = 0;
let tapTimer  = null;
const TAP_WINDOW = 400;

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

function openLoginModal() {
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
    if (username === MASTER_USER && password === MASTER_PASS) {
      authState.isAdmin     = true;
      authState.isMaster    = true;
      authState.username    = MASTER_USER;
      authState.displayName = "Master";
      saveSession();
      applyAuthUI();
      document.getElementById("loginOverlay").classList.add("hidden");
      document.body.style.overflow = "";
      openAdminMgr();
      return;
    }

    if (window._db) {
      const { doc, getDoc } = window._fbModules;
      const snap = await getDoc(doc(window._db, "admins", username));
      if (snap.exists()) {
        const data = snap.data();
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
          const adminNavBtn = document.getElementById("nav-admin-btn");
          goTo("admin", adminNavBtn);
          return;
        }
      }
    } else {
      showLoginMsg("Firebase não conectado. Só o login master está disponível.", "warn");
      btn.textContent = "Entrar";
      return;
    }
    showLoginMsg("Usuário ou senha incorretos.", "error");
    btn.textContent = "Entrar";
  } catch(err) {
    console.error("Login error:", err);
    showLoginMsg('Erro ao verificar credenciais. Tente novamente.','error');
    btn.textContent = "Entrar";
  }
}

function doLogout() {
  if (!confirm("Deseja encerrar a sessão de administrador?")) return;
  clearSession();
  goTo("home", document.querySelector(".nav-item"));
  document.querySelector(".nav-item").classList.add("active");
}

function renderAdminSessionBar() {
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

  if (!username || !password) { showAdminMgrMsg("Preencha usuário e senha.", "error"); return; }
  if (!/^[a-z0-9_]+$/.test(username)) { showAdminMgrMsg("Usuário: apenas letras minúsculas, números e _", "error"); return; }
  if (password.length < 6) { showAdminMgrMsg("Senha deve ter ao menos 6 caracteres.", "error"); return; }
  if (username === MASTER_USER) { showAdminMgrMsg("Esse nome de usuário é reservado.", "error"); return; }

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

function updateConservLabel(val) { document.getElementById("conserv-label").textContent = val + "%"; }

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
    showAdminMsg("Máximo de 4 itens de estado.", "warn"); return;
  }
  const row = document.createElement("div");
  row.className = "estado-input-row";
  row.innerHTML = `
    <select class="estado-dot-sel"><option value="green">🟢</option><option value="yellow">🟡</option><option value="red">🔴</option></select>
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
  document.getElementById("af-materiais").value = "";
  document.getElementById("af-tecnicas").value = "";
  document.getElementById("af-notas").value = "";
  
  const estadoContainer = document.getElementById("estadoInputs");
  estadoContainer.innerHTML = `
    <div class="estado-input-row">
      <select class="estado-dot-sel"><option value="green">🟢</option><option value="yellow">🟡</option><option value="red">🔴</option></select>
      <input type="text" placeholder="Ex: Estrutura: Boa" class="estado-label-inp" />
      <button type="button" class="btn-rm-estado" onclick="removeEstado(this)">✕</button>
    </div>
  `;

  const catContainer = document.getElementById("categoriaInputs");
  if (catContainer) {
    catContainer.innerHTML = `
      <div class="cat-input-row" style="display:flex; gap:8px; align-items:center; width:100%;">
        <select class="af-cat-select" style="flex:1;">
          ${CATEGORIAS.map(cat => `<option value="${cat.value}">${cat.emoji} ${cat.label}</option>`).join("")}
        </select>
        <button type="button" class="btn-rm-estado" onclick="removeCategoriaRow(this)" style="display:none;">✕</button>
      </div>
    `;
  }
} 

async function salvarPatrimonio() {
  try {
    const id = (document.getElementById("af-id").value || "").trim() || null;
    const nome = (document.getElementById("af-nome").value || "").trim();
    if (!nome) { showAdminMsg("Nome é obrigatório.", "error"); return; }

    const item = {
      id: id || nome.toLowerCase().replace(/[^a-z0-9]+/gi, '-'),
      nome,
      endereco: (document.getElementById("af-end").value || "").trim(),
      categoria: document.querySelector('.af-cat-select')?.value || 'historico',
      fundado: (document.getElementById("af-fundado").value || "").trim(),
      estilo: (document.getElementById("af-estilo").value || "").trim(),
      img: (document.getElementById("af-img").value || "").trim(),
      imgAfter: (document.getElementById("af-imgafter").value || "").trim(),
      desc: (document.getElementById("af-desc").value || "").trim(),
      compareDesc: (document.getElementById("af-comparedesc").value || "").trim(),
      conservacao: parseInt(document.getElementById("af-conserv").value || 70, 10),
      destaque: !!document.getElementById("af-destaque").checked,
      simulacoes: (document.getElementById("af-sims").value || "").split(/,\s*/).filter(Boolean),
      simResultTags: (document.getElementById("af-simtags").value || "").split(/,\s*/).filter(Boolean),
      estado: readEstadoInputs(),
      lat: parseFloat(document.getElementById("af-lat").value) || 0,
      lng: parseFloat(document.getElementById("af-lng").value) || 0,
      materiais: (document.getElementById("af-materiais").value || "").trim(),
      tecnicas: (document.getElementById("af-tecnicas").value || "").trim(),
      notas: (document.getElementById("af-notas").value || "").trim(),
    };

    const existingIdx = PATRIMONIOS.findIndex(p => p.id === item.id);
    if (existingIdx >= 0) PATRIMONIOS[existingIdx] = item;
    else PATRIMONIOS.push(item);

    if (window._db) {
      try {
        const { doc, setDoc } = window._fbModules;
        await setDoc(doc(window._db, "patrimonios", item.id), item);
      } catch(e) { console.warn('Firebase save error:', e); }
    }

    showAdminMsg('Patrimônio salvo com sucesso!', 'success');
    resetAdminForm();
    renderHome();
    addMapMarkers(PATRIMONIOS);
    loadAdminList();
  } catch(err) {
    console.error(err);
    showAdminMsg('Erro ao salvar patrimônio.', 'error');
  }
}

async function loadAdminList() {
  const wrap = document.getElementById("admin-list-wrap");
  if (!wrap) return;
  wrap.innerHTML = `<div class="admin-list-empty">Carregando...</div>`;

  let data = [...PATRIMONIOS];

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

function addCategoriaRow() {
  const container = document.getElementById("categoriaInputs");
  const row = document.createElement("div");
  row.className = "cat-input-row";
  row.style.cssText = "display:flex; gap:8px; align-items:center; width:100%; margin-top:4px;";
  row.innerHTML = `
    <select class="af-cat-select" style="flex:1;">
      ${CATEGORIAS.map(cat => `<option value="${cat.value}">${cat.emoji} ${cat.label}</option>`).join("")}
    </select>
    <button type="button" class="btn-rm-estado" onclick="removeCategoriaRow(this)">✕</button>
  `;
  container.appendChild(row);
}

function removeCategoriaRow(btn) {
  btn.closest(".cat-input-row").remove();
}

function renderCategoriasUI() {
  const selectsAdmin = document.querySelectorAll(".af-cat-select");
  selectsAdmin.forEach(select => {
    const currentVal = select.value; 
    select.innerHTML = CATEGORIAS.map(c => `<option value="${c.value}">${c.emoji} ${c.label}</option>`).join("");
    if (currentVal) select.value = currentVal;
  });

  const mapFilters = document.querySelector(".map-filters");
  if (mapFilters) {
    mapFilters.innerHTML = `
      <button class="filter-btn active" data-cat="all" onclick="filterMap('all',this)">🏛️ Todos</button>
    ` + CATEGORIAS.map(c => `
      <button class="filter-btn" data-cat="${c.value}" onclick="filterMap('${c.value}',this)">${c.emoji} ${c.label}</button>
    `).join("");
  }
}

function criarNovaCategoriaGlobal() {
  const nomeInp = document.getElementById("ac-nome");
  const emojiInp = document.getElementById("ac-emoji");
  if (!nomeInp || !emojiInp) return;
  
  const nome = nomeInp.value.trim();
  const emoji = emojiInp.value.trim() || "📍";
  if (!nome) { alert("Por favor, digite o nome da categoria."); return; }
  
  const value = nome.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-');
  if (CATEGORIAS.some(c => c.value === value)) { alert("Esta categoria já existe no sistema!"); return; }
  
  const paletasNovas = [
    { color: "#8B4513", accent: "#D2691E", ring: "rgba(139,69,19,0.25)" },
    { color: "#008080", accent: "#48D1CC", ring: "rgba(0,128,128,0.25)" },
    { color: "#4B0082", accent: "#9370DB", ring: "rgba(75,0,130,0.25)" }
  ];
  const corConfig = paletasNovas[CATEGORIAS.length % paletasNovas.length];
  
  CATEGORIAS.push({ value: value, label: nome, emoji: emoji, ...corConfig });
  renderCategoriasUI();
  nomeInp.value = ""; emojiInp.value = "";
  alert(`Categoria "${nome}" registrada globalmente!`);
}

function editPatrimonio(id) {
  const p = PATRIMONIOS.find(x => x.id === id);
  if (!p) return;

  const tabBtn = document.querySelector('[data-tab="novo"]');
  switchAdminTab("novo", tabBtn);

  const catContainer = document.getElementById("categoriaInputs");
  if (catContainer) {
    catContainer.innerHTML = ""; 
    const catList = [p.categoria];
    if (p.categoriasExtras && Array.isArray(p.categoriasExtras)) {
      catList.push(...p.categoriasExtras);
    }

    catContainer.innerHTML = catList.map((catVal, i) => `
      <div class="cat-input-row" style="display:flex; gap:8px; align-items:center; width:100%;">
        <select class="af-cat-select" style="flex:1;">
          ${CATEGORIAS.map(cat => `<option value="${cat.value}" ${cat.value===catVal?"selected":""}>${cat.emoji} ${cat.label}</option>`).join("")}
        </select>
        <button type="button" class="btn-rm-estado" onclick="removeCategoriaRow(this)" ${i===0?"style=\"display:none;\"":""}>✕</button>
      </div>
    `).join("");
  }

  document.getElementById("af-nome").value    = p.nome || "";
  document.getElementById("af-id").value      = p.id || "";
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
  document.getElementById("af-materiais").value = p.materiais || "";
  document.getElementById("af-tecnicas").value = p.tecnicas || "";
  document.getElementById("af-notas").value = p.notas || "";
  document.getElementById("af-sims").value    = (p.simulacoes || []).join(", ");
  document.getElementById("af-simtags").value = (p.simResultTags || []).join(", ");
  document.getElementById("af-destaque").checked = !!p.destaque;

  previewImg("af-img", "prev-img");
  previewImg("af-imgafter", "prev-imgafter");

  const estadoContainer = document.getElementById("estadoInputs");
  if (estadoContainer) {
    estadoContainer.innerHTML = "";
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
      estadoContainer.appendChild(row);
    });
  }

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

function abrirNoGoogleMaps() {
  if (!currentPatrimonio) return;
  const enderecoEncoded = encodeURIComponent(currentPatrimonio.endereco + ", São José dos Campos");
  const url = `https://www.google.com/maps/search/?api=1&query=${enderecoEncoded}`;
  window.open(url, '_blank');
}

// ══════════════════════════════════════════════
// ADMIN TABS
// ══════════════════════════════════════════════
function switchAdminTab(tabId, btn) {
  document.querySelectorAll('.admin-tab').forEach(b => b.classList.remove('active'));
  if (btn) {
    btn.classList.add('active');
  } else {
    document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
  }

  document.querySelectorAll('.admin-tab-content').forEach(c => c.classList.remove('active'));
  document.getElementById('admin-tab-' + tabId).classList.add('active');

  if (tabId === 'lista') {
    loadAdminList();
  }
}

async function compartilharPatrimonio() {
  if (!currentPatrimonio) return;
  const p = currentPatrimonio;
  const link = window.location.origin + window.location.pathname + "?id=" + p.id;
  
  if (navigator.share) {
    try {
      await navigator.share({
        title: `ReMemória: ${p.nome}`,
        text: `Veja os detalhes de ${p.nome} no app ReMemória.`,
        url: link
      });
    } catch (err) {
      console.warn("Compartilhamento cancelado.");
    }
  } else {
    try {
      await navigator.clipboard.writeText(link);
      alert("Link do patrimônio copiado para a área de transferência!");
    } catch (err) {
      alert("Link para compartilhar: " + link);
    }
  }
}

// ══════════════════════════════════════════════
// IMPORTAÇÃO EM LOTE (CSV)
// ══════════════════════════════════════════════
async function processarCSV() {
  const fileInput = document.getElementById("csvFileInput");
  const msgEl = document.getElementById("admin-lote-msg");

  if (!fileInput.files.length) {
    mostrarMsgLote("Por favor, selecione um arquivo CSV.", "error");
    return;
  }

  const file = fileInput.files[0];
  const reader = new FileReader();

  reader.onload = async (e) => {
    const text = e.target.result;
    
    // Divide por linhas
    const linhas = text.split('\n').filter(l => l.trim() !== "");

    if (linhas.length < 2) {
      mostrarMsgLote("O arquivo parece estar vazio ou sem dados preenchidos.", "error");
      return;
    }

    // Lê o cabeçalho (padrão de exportação do Sheets usa vírgula)
    const cabecalho = linhas[0].split(',').map(c => c.trim().toLowerCase());
    let importados = 0;
    let erros = 0;

    mostrarMsgLote("Processando importação... Por favor, aguarde.", "info");

    // Itera sobre as linhas do CSV (ignorando o cabeçalho)
    for (let i = 1; i < linhas.length; i++) {
      // Regex para separar por vírgula, mas ignorar vírgulas dentro de aspas duplas (textos de descrição)
      const valores = linhas[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(v => v.replace(/^"|"$/g, '').trim());

      if (valores.length < 2) continue;

      const obj = {};
      cabecalho.forEach((col, index) => {
        obj[col] = valores[index] || "";
      });

      if (!obj.nome) { erros++; continue; }

      // Se não enviou ID, cria um slug automático com base no nome
      const novoId = obj.id || obj.nome.toLowerCase().replace(/[^a-z0-9]+/gi, '-');

      // Traduz o campo de estado da sintaxe da planilha (ex: green:Estrutura Intacta|yellow:Pintura Desbotada)
      let arrayEstado = [{ dot: "green", label: "Estrutura: Boa" }];
      if (obj.estado) {
        arrayEstado = obj.estado.split('|').map(item => {
          const [dot, label] = item.split(':');
          return { 
            dot: dot ? dot.trim().toLowerCase() : "green", 
            label: label ? label.trim() : "" 
          };
        }).filter(e => e.label);
      }

      // Monta o objeto no padrão rigoroso do ReMemória
      const item = {
        id: novoId,
        nome: obj.nome,
        endereco: obj.endereco,
        categoria: obj.categoria || 'historico',
        fundado: obj.fundado,
        estilo: obj.estilo,
        img: "", // Vazias de propósito, conforme sua instrução
        imgAfter: "",
        desc: obj.desc,
        compareDesc: obj.comparedesc,
        conservacao: parseInt(obj.conservacao) || 70,
        destaque: obj.destaque === "true" || obj.destaque === "1" || obj.destaque.toLowerCase() === "sim",
        simulacoes: obj.simulacoes ? obj.simulacoes.split(',').map(s => s.trim()) : [],
        simResultTags: obj.simresulttags ? obj.simresulttags.split(',').map(s => s.trim()) : [],
        estado: arrayEstado,
        lat: parseFloat(obj.lat) || 0,
        lng: parseFloat(obj.lng) || 0,
        materiais: obj.materiais || "",
        tecnicas: obj.tecnicas || "",
        notas: obj.notas || "",
      };

      // Salva na memória local
      const existingIdx = PATRIMONIOS.findIndex(p => p.id === item.id);
      if (existingIdx >= 0) PATRIMONIOS[existingIdx] = item;
      else PATRIMONIOS.push(item);

      // Salva no banco de dados (Firebase)
      if (window._db) {
        try {
          const { doc, setDoc } = window._fbModules;
          await setDoc(doc(window._db, "patrimonios", item.id), item);
          importados++;
        } catch(err) {
          console.warn("Erro ao salvar no Firebase:", err);
          erros++;
        }
      } else {
        importados++;
      }
    }

    mostrarMsgLote(`✅ Importação concluída! ${importados} salvos, ${erros} ignorados/erros.`, "success");
    
    // Atualiza a interface gráfica com os novos dados
    renderHome();
    if (typeof addMapMarkers === "function") addMapMarkers(PATRIMONIOS);
    if (typeof loadAdminList === "function") loadAdminList();
    if (typeof updateChatbotOptions === "function") updateChatbotOptions();
    
    // Limpa o input
    fileInput.value = "";
  };

  reader.onerror = () => mostrarMsgLote("Erro ao ler o arquivo.", "error");
  reader.readAsText(file);
}

function mostrarMsgLote(text, type) {
  const el = document.getElementById("admin-lote-msg");
  el.classList.remove("hidden");
  el.textContent = text;
  el.className = "admin-msg admin-msg-" + type;
}