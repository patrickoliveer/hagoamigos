const VIEWS = {
  mural: document.getElementById("view-mural"),
  jogadores: document.getElementById("view-jogadores"),
};
const menuButtons = document.querySelectorAll(".menu-btn");
const playersData = Array.isArray(window.DATA_PLAYERS) ? window.DATA_PLAYERS : [];

const els = {
  muralCards: document.getElementById("mural-cards"),
  playersList: document.getElementById("players-list"),
  profile: document.getElementById("player-profile"),
  search: document.getElementById("search"),
  order: document.getElementById("order"),
};

function initialsFromName(name = "") {
  const parts = name.trim().split(/\s+/);
  const letters = parts.slice(0,2).map(p => p[0]?.toUpperCase() ?? "");
  return letters.join("") || "?";
}
function createAvatar(name, src = "") {
  const el = document.createElement("div");
  el.className = "avatar";
  if (src) {
    const img = document.createElement("img");
    img.src = src; img.alt = `Avatar de ${name}`;
    img.width = 40; img.height = 40;
    img.style.borderRadius = "12px";
    img.style.border = "1px solid var(--border)";
    el.textContent = "";
    el.appendChild(img);
    return el;
  }
  el.textContent = initialsFromName(name);
  return el;
}
function sortPlayers(list, mode) {
  const copy = [...list];
  switch (mode) {
    case "nome-asc": copy.sort((a,b)=>a.nome.localeCompare(b.nome)); break;
    case "nome-desc": copy.sort((a,b)=>b.nome.localeCompare(a.nome)); break;
    case "feitos-desc": copy.sort((a,b)=>(b.feitos?.length||0)-(a.feitos?.length||0)); break;
    case "feitos-asc": copy.sort((a,b)=>(a.feitos?.length||0)-(b.feitos?.length||0)); break;
  }
  return copy;
}

function renderMural() {
  els.muralCards.innerHTML = "";
  playersData.forEach(p => {
    const card = document.createElement("div");
    card.className = "card";

    const header = document.createElement("div");
    header.className = "card-header";
    header.appendChild(createAvatar(p.nome, p.avatar));
    const title = document.createElement("h3");
    title.className = "card-title";
    title.textContent = p.nome;
    header.appendChild(title);
    card.appendChild(header);

    if (Array.isArray(p.destaques) && p.destaques.length) {
      const ul = document.createElement("ul");
      ul.style.margin = "0 0 6px 18px";
      ul.style.padding = "0";
      p.destaques.slice(0, 2).forEach(d => {
        const li = document.createElement("li");
        li.textContent = d;
        ul.appendChild(li);
      });
      card.appendChild(ul);
    } else {
      const none = document.createElement("div");
      none.className = "player-meta";
      none.textContent = "Sem destaques ainda.";
      card.appendChild(none);
    }

    const badges = document.createElement("div");
    badges.className = "badges";
    (p.emblemas || []).slice(0,3).forEach(em => {
      const b = document.createElement("span");
      b.className = "badge";
      if (em.icone) {
        const img = document.createElement("img");
        img.src = em.icone; img.alt = em.nome;
        b.appendChild(img);
      }
      const label = document.createElement("span");
      label.textContent = em.nome;
      b.appendChild(label);
      badges.appendChild(b);
    });
    if (badges.children.length) card.appendChild(badges);

    card.style.cursor = "pointer";
    card.addEventListener("click", () => {
      switchView("jogadores");
      openPlayerProfile(p.id);
    });

    els.muralCards.appendChild(card);
  });
}

function renderPlayersList(list) {
  els.playersList.innerHTML = "";
  list.forEach(p => {
    const item = document.createElement("div");
    item.className = "player-item";

    const top = document.createElement("div");
    top.className = "player-top";
    top.appendChild(createAvatar(p.nome, p.avatar));

    const info = document.createElement("div");
    const name = document.createElement("h4");
    name.className = "player-name"; name.textContent = p.nome;
    const meta = document.createElement("div");
    meta.className = "player-meta";
    const feitosCount = (p.feitos?.length || 0);
    meta.textContent = `${p.jogo} • ${feitosCount} feito(s)`;

    info.appendChild(name);
    info.appendChild(meta);
    top.appendChild(info);

    const badges = document.createElement("div");
    badges.className = "badges";
    (p.emblemas || []).slice(0, 2).forEach(em => {
      const b = document.createElement("span");
      b.className = "badge";
      if (em.icone) {
        const img = document.createElement("img");
        img.src = em.icone; img.alt = em.nome;
        b.appendChild(img);
      }
      const label = document.createElement("span");
      label.textContent = em.nome;
      b.appendChild(label);
      badges.appendChild(b);
    });

    item.appendChild(top);
    if (badges.children.length) item.appendChild(badges);

    item.addEventListener("click", () => openPlayerProfile(p.id));

    els.playersList.appendChild(item);
  });
}

function openPlayerProfile(playerId) {
  const p = playersData.find(x => x.id === playerId);
  if (!p) return;

  const wrap = document.createElement("div");

  const header = document.createElement("div");
  header.className = "profile-header";
  header.appendChild(createAvatar(p.nome, p.avatar));
  const name = document.createElement("h3");
  name.className = "profile-name"; name.textContent = p.nome;
  header.appendChild(name);

  const grid = document.createElement("div");
  grid.className = "profile-grid";

  const stats = document.createElement("section");
  stats.className = "profile-panel";
  const statsTitle = document.createElement("h3"); statsTitle.textContent = "Estatísticas";
  stats.appendChild(statsTitle);

  const kv = document.createElement("div"); kv.className = "kv";
  const s = p.stats || {};
  const rows = [
    ["Jogo", p.jogo || "—"],
    ["Nível", s.nivel ?? "—"],
    ["Coroas", s.coroas ?? "—"],
    ["Vitórias", s.vitorias ?? "—"],
    ["Partidas", s.partidas ?? "—"],
    ["Taxa de Vitória", s.taxaVitoria ?? "—"],
  ];
  rows.forEach(([k, v]) => {
    const kd = document.createElement("div"); kd.className = "k"; kd.textContent = k;
    const vd = document.createElement("div"); vd.className = "v"; vd.textContent = v;
    kv.appendChild(kd); kv.appendChild(vd);
  });
  stats.appendChild(kv);

  const emb = document.createElement("section");
  emb.className = "profile-panel";
  const embTitle = document.createElement("h3"); embTitle.textContent = "Emblemas";
  emb.appendChild(embTitle);

  if (Array.isArray(p.emblemas) && p.emblemas.length) {
    const line = document.createElement("div");
    line.className = "badges";
    p.emblemas.forEach(em => {
      const b = document.createElement("span");
      b.className = "badge";
      if (em.icone) {
        const img = document.createElement("img");
        img.src = em.icone; img.alt = em.nome;
        b.appendChild(img);
      }
      const label = document.createElement("span");
      label.textContent = em.nome;
      b.title = em.descricao || "";
      b.appendChild(label);
      line.appendChild(b);
    });
    emb.appendChild(line);
  } else {
    const none = document.createElement("div");
    none.className = "player-meta";
    none.textContent = "Sem emblemas cadastrados.";
    emb.appendChild(none);
  }

  const feitos = document.createElement("section");
  feitos.className = "profile-panel";
  const feitosTitle = document.createElement("h3"); feitosTitle.textContent = "Feitos";
  feitos.appendChild(feitosTitle);

  if (Array.isArray(p.feitos) && p.feitos.length) {
    const ul = document.createElement("ul");
    ul.style.margin = "0 0 0 18px"; ul.style.padding = "0";
    p.feitos.forEach(f => {
      const li = document.createElement("li");
      li.textContent = f;
      ul.appendChild(li);
    });
    feitos.appendChild(ul);
  } else {
    const none = document.createElement("div");
    none.className = "player-meta";
    none.textContent = "Sem feitos cadastrados.";
    feitos.appendChild(none);
  }

  grid.appendChild(stats);
  grid.appendChild(emb);
  grid.appendChild(feitos);

  wrap.appendChild(header);
  wrap.appendChild(grid);

  els.profile.innerHTML = "";
  els.profile.appendChild(wrap);

  els.profile.scrollIntoView({ behavior: "smooth", block: "start" });
}

function switchView(viewName) {
  Object.entries(VIEWS).forEach(([name, el]) => {
    const btn = Array.from(menuButtons).find(b => b.dataset.view === name);
    const isTarget = (name === viewName);

    btn?.classList.toggle("active", isTarget);

    if (isTarget) {
      el.hidden = false;
      el.classList.remove("fade-hidden");
      el.classList.add("fade-in", "view-active");
    } else {
      el.classList.add("fade-hidden");
      el.classList.remove("fade-in", "view-active");
      setTimeout(() => { el.hidden = true; }, 250);
    }
  });
}

function applyFilters() {
  const q = (els.search.value || "").trim().toLowerCase();
  const order = els.order.value;
  let list = playersData;

  if (q) list = list.filter(p => (p.nome || "").toLowerCase().includes(q));
  list = sortPlayers(list, order);

  renderPlayersList(list);
}

function init() {
  menuButtons.forEach(btn => btn.addEventListener("click", () => switchView(btn.dataset.view)));
  els.search?.addEventListener("input", applyFilters);
  els.order?.addEventListener("change", applyFilters);

  renderMural();
  applyFilters();

  function handleHash() {
    const hash = location.hash.replace(/^#\/?/, "");
    if (hash.startsWith("jogador/")) {
      const id = hash.split("/")[1];
      switchView("jogadores");
      openPlayerProfile(id);
    } else if (hash === "jogadores") {
      switchView("jogadores");
    } else {
      switchView("mural");
    }
  }
  window.addEventListener("hashchange", handleHash);
  handleHash();
}

document.addEventListener("DOMContentLoaded", init);
