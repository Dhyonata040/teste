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
    window.open("https://www.google.com/search?q=" + this.value);
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

// ===== SLIDER AUTO =====
async function carregarSlider(){
  let dados = await carregarCSV(SHEET_SLIDER);
  let div = document.getElementById("slider");

  dados.forEach(l=>{
    let [img, link] = l.split(",");
    if(!img || !link) return;

    let el = document.createElement("img");
    el.src = limpar(img);
    el.onclick = ()=> window.open(limpar(link));

    div.appendChild(el);
  });

  let scroll = 0;
  setInterval(()=>{
    scroll += 1;
    div.scrollLeft = scroll;
    if(scroll >= div.scrollWidth - div.clientWidth){
      scroll = 0;
    }
  }, 30);
}

// ===== STREAMING =====
async function carregarStreaming(){
  let dados = await carregarCSV(SHEET_STREAMING);
  let div = document.getElementById("streaming");

  dados.forEach(l=>{
    let [nome, img, link] = l.split(",");
    let el = document.createElement("div");

    el.innerHTML = `<img src="${limpar(img)}"><p>${limpar(nome)}</p>`;
    el.onclick = ()=> window.open(limpar(link));

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
    el.onclick = ()=> window.open(limpar(link));

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

    el.onclick = ()=> window.open(link);

    div.appendChild(el);
  });
}

// ===== RADIO =====
function carregarMusica(){
  let div = document.getElementById("listaMusica");

  div.innerHTML = `
    <div class="radio-card" onclick="window.open('https://radiosaovivo.net/')">
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

document.addEventListener("mousemove", (e)=>{
  document.body.style.setProperty("--x", e.clientX + "px");
  document.body.style.setProperty("--y", e.clientY + "px");
});

document.addEventListener("mousemove", (e)=>{
  document.body.style.setProperty("--x", e.clientX + "px");
  document.body.style.setProperty("--y", e.clientY + "px");
});