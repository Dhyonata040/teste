// ===== LINKS =====
const SHEET_SLIDER = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRTYrS6YGaWlQX2IqAPWEhc0jpxo0b74b_lmF6D1ct76OtjDlQ6fkK9whmlbWrwhhqkV_EOCmw0sd2J/pub?gid=0&single=true&output=csv";
const SHEET_STREAMING = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRTYrS6YGaWlQX2IqAPWEhc0jpxo0b74b_lmF6D1ct76OtjDlQ6fkK9whmlbWrwhhqkV_EOCmw0sd2J/pub?gid=1566671242&single=true&output=csv";
const SHEET_FILMES = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRTYrS6YGaWlQX2IqAPWEhc0jpxo0b74b_lmF6D1ct76OtjDlQ6fkK9whmlbWrwhhqkV_EOCmw0sd2J/pub?gid=173844853&single=true&output=csv";
const SHEET_TV = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRTYrS6YGaWlQX2IqAPWEhc0jpxo0b74b_lmF6D1ct76OtjDlQ6fkK9whmlbWrwhhqkV_EOCmw0sd2J/pub?gid=508486891&single=true&output=csv";

// ===== NAV =====
function ir(pagina){
  document.querySelectorAll(".pagina").forEach(p=>p.style.display="none");
  document.getElementById(pagina).style.display = "block";
}

// ===== BUSCA =====
document.getElementById("busca").addEventListener("keypress", function(e){
  if(e.key === "Enter"){
    location.href = "https://www.google.com/search?q=" + this.value;
  }
});

// ===== UTIL =====
function limpar(txt){
  return txt?.replace(/\r/g, "").replace(/"/g, "").trim();
}

async function carregarCSV(url){
  let res = await fetch(url);
  let text = await res.text();
  return text.split("\n").slice(1);
}

// ===== SLIDER (LISO SEM TRAVAR) =====
async function carregarSlider(){
  let dados = await carregarCSV(SHEET_SLIDER);
  let div = document.getElementById("slider");

  let track = document.createElement("div");
  track.className = "slider-track";

  let items = [];

  dados.forEach(l=>{
    let [img, link] = l.split(",");
    if(!img || !link) return;

    let el = document.createElement("img");
    el.src = limpar(img);

    el.onclick = ()=> location.href = limpar(link);

    track.appendChild(el);
    items.push({img, link});
  });

  // DUPLICA PRA LOOP PERFEITO
  items.forEach(i=>{
    let el = document.createElement("img");
    el.src = limpar(i.img);

    el.onclick = ()=> location.href = limpar(i.link);

    track.appendChild(el);
  });

  div.appendChild(track);
}

// ===== STREAMING =====
async function carregarStreaming(){
  let dados = await carregarCSV(SHEET_STREAMING);
  let div = document.getElementById("streaming");

  dados.forEach(l=>{
    let [nome, img, link] = l.split(",");

    let el = document.createElement("div");
    el.innerHTML = `<img src="${limpar(img)}"><p>${limpar(nome)}</p>`;
    el.onclick = ()=> location.href = limpar(link);

    div.appendChild(el);
  });
}

// ===== FILMES =====
async function carregarFilmes(){
  let dados = await carregarCSV(SHEET_FILMES);
  let div = document.getElementById("listaFilmes");

  dados.forEach(l=>{
    let [img, nome, link] = l.split(",");

    let el = document.createElement("div");
    el.innerHTML = `<img src="${limpar(img)}"><p>${limpar(nome)}</p>`;
    el.onclick = ()=> location.href = limpar(link);

    div.appendChild(el);
  });
}

// ===== TV =====
async function carregarTV(){
  let dados = await carregarCSV(SHEET_TV);
  let div = document.getElementById("listaTV");

  dados.forEach(l=>{
    let partes = l.split(",");
    let nome = limpar(partes[0]);
    let link = limpar(partes.slice(1).join(","));

    let el = document.createElement("div");
    el.className = "tv-card";
    el.innerHTML = `<p>${nome}</p>`;
    el.onclick = ()=> location.href = link;

    div.appendChild(el);
  });
}

// ===== RADIO =====
function carregarMusica(){
  let div = document.getElementById("listaMusica");

  div.innerHTML = `
    <div class="radio-card" onclick="location.href='https://radiosaovivo.net/'">
      <h2>📻 Rádio ao Vivo</h2>
      <p>Clique para ouvir várias rádios online</p>
    </div>
  `;
}

// ===== START =====
ir("home");
carregarSlider();
carregarStreaming();
carregarFilmes();
carregarTV();
carregarMusica();

// ===== FUNDO ESTRELADO =====
const canvas = document.createElement("canvas");
document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");

canvas.style.position = "fixed";
canvas.style.top = 0;
canvas.style.left = 0;
canvas.style.zIndex = "-2";

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];

for(let i = 0; i < 80; i++){
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 2,
    speed: Math.random() * 0.5
  });
}

let mouse = { x: 0, y: 0 };

document.addEventListener("mousemove", (e)=>{
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);

  stars.forEach(s=>{
    s.y += s.speed;

    if(s.y > canvas.height){
      s.y = 0;
      s.x = Math.random() * canvas.width;
    }

    let dx = s.x - mouse.x;
    let dy = s.y - mouse.y;
    let dist = Math.sqrt(dx*dx + dy*dy);

    if(dist < 120){
      s.x += dx * 0.02;
      s.y += dy * 0.02;
    }

    ctx.beginPath();
    ctx.arc(s.x, s.y, s.size, 0, Math.PI*2);
    ctx.fillStyle = "white";
    ctx.fill();
  });

  requestAnimationFrame(animate);
}

animate();

// RESPONSIVO
window.addEventListener("resize", ()=>{
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
