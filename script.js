/* ═══════════════════════════════════════════════════════════════
   SOBRE SORPRESA PARA NAYDÚ — JavaScript Vanilla
   Fondo: campo de flores nocturno
   Sobre: murciélago (sello, solapa 3D, carta animada)
   Carta: estilo original (tema morado/rosa) + máquina de escribir
   ═══════════════════════════════════════════════════════════════ */

 /* ┌──────────────────────────────────────────────────────────┐
    │  MENSAJE PERSONALIZADO PARA NAYDÚ                         │
    │  (edita las líneas de abajo si quieres cambiar algo)      │
    └──────────────────────────────────────────────────────────┘ */

const TITULO    = "Para Naydú";          // Encabezado de la carta
const SALUDO    = "Mi niña hermosa";     // Primera línea

const MENSAJE   = [
  "Mi niña sabes qué día es hoy",
  "sí, 27 de OCTUBRE, MI PRINCESA, HOY ES EL DÍA DE TU CUMPLEAÑOS",
  "mi amor de verdad quisiera poder pasar este día tan importante contigo",
  "poder celebrarlo como se debe, mi niña preciosa",
  "como la niña hermosa que eres",
  "pero sé que estás muy lejos y estás muy ocupadita esta semana",
  "lo mejor que puedo hacer es recordarte lo hermosa y maravillosa que eres",
  "mi niña, tú eres una niña inteligente, hermosa, bonita",
  "no hay manera de describirte ante mis ojos",
  "mi canelita, de verdad siempre serás la niña más hermosa que hay en este mundo",
  "siempre serás y eres mi adoración entera.",
  "mi amor, hoy cumples 19 añitos ;3",
  "estás creciendo rápido",
  "aún recuerdo cuando tenías 17 añitos",
  "que salíamos a caminar a los cerros",
  "salíamos a entrenar todos esos recuerdos del principio",
  "mi vida, son muy lindos porque me hacen detenerme y poder observar",
  "cómo hemos crecido juntos",
  "ya son dos añitos que te veo lograr tus metas",
  "esforzarte por lo que quieres",
  "y más que todo estar ahí cuando no había nadie...",
  "... mi amor, te amo de una manera tan indescriptible",
  "mi princesa, mi canelita",
  "no han habido palabras ni algo tan semejante a todo lo que he llegado a sentir por ti",
  "mi morena hermosa, nunca habrán palabras ni nada que se acerque",
  "te he amado sin razón alguna",
  "te he deseado, te he amado, te he adorado",
  "como un religioso a su dios, toda mi devoción te pertenece",
  "solo quiero decirte que siempre estaré contigo",
  "sin importar el momento, las circunstancias, el motivo o razón",
  "siempre me tendrás conmigo",
  "porque como mi amor, mi corazón, mi cuerpo y mi ser",
  "siempre serán fieles a ti, estando para ti toda mi vida",
  "o al menos hasta el último latido de mi corazón",
  "... no hay tristeza que pueda con él",
  "ni dolor que no pueda vencer, amor",
  "puedo ser la alegría de tu amanecer",
  "los besitos mañaneros que erizan a tu piel",
  "yo amarte más no puedo...",
  "por favor, no llores, morena",
  "siempre estaré contigo incluso en los días que no puedas más",
  "solo no llores, morena... no llores, mi morena",
  "",
  "no sé si recuerdes fragmentos de las canciones de Darviin",
  "todas aquellas que te dediqué, te canté y te pude dar",
  "con lo más puro de mi ser, tanto como un beso",
  "sí, porque ¿qué será que todo es más bello cuando vos estás?",
  "me niego que es mera casualidad, no, no, no..",
  "algo tan bello solo pudo venir de mi dulce dios..",
  "bésame con tus labios que hidratan con uno de esos besos",
  "https://youtu.be/K-Y3afQINFA?si=Vp88gsQE8OJAyPJ1",
  "",
  "Mi niña, ah, de verdad quisiera poder estar ahí contigo",
  "quisiera acortar la distancia con un solo paso o pensamiento",
  "para que mis brazos fueran el refugio exacto",
  "donde pudieras tú soltar el peso del día",
  "mi canelita hermosa",
  "me duele este espacio que me roba el brillo de tu risa",
  "porque te adoro con una devoción y amor inmensa",
  "y mi mundo entero orbita donde tú estás",
  "si pudiera, detendría el reloj en este instante",
  "para volar a tu lado",
  "sentarme cerquita de ti",
  "espantar cualquier sombra que te ronde",
  "y recordarte lo infinitamente maravillosa que eres ante mis ojos",
  "",
  "Aunque mis manos hoy no puedan rozar tus mejillas",
  "mi pensamiento ya cruzó el cielo entero para hacerte compañía",
  "y demostrarte que siempre estaré contigo, mi princesa",
  "sin importar las circunstancias",
  "cierra los ojos un segundo",
  "ahí en la quietud y en el calor de tu pecho",
  "estoy latiendo a tu lado, siendo fiel hasta el último de mis latidos",
  "guardaré cada abrazo y cada beso",
  "para ser la alegría de tu amanecer",
  "y vencer cualquier dolor",
  "así que, por favor, no llores, mi morena",
  "que todo este amor te abrace fuerte",
  "hasta el día en que este quisiera se convierta al fin en un aquí estoy"
];

const DESPEDIDA = "Con todo mi amor, siempre.";     // Cierre de la carta
const FIRMA     = "— Tu canelita que te ama";         // Tu firma

/* Velocidades de la escritura (milisegundos) */
let VELOCIDAD_TECLA = 40;   // tiempo entre letras (menor = más rápido)
let PAUSA_LINEA     = 400;  // pausa entre líneas

/* ═══════════════════════════════════════════════════════════════
   A partir de aquí no necesitas tocar nada.
   ═══════════════════════════════════════════════════════════════ */

const scene     = document.getElementById("scene");
const flap      = document.getElementById("flap");
const letter    = document.getElementById("letter");
const seal      = document.getElementById("seal");
const mensajeEl = document.getElementById("mensaje");
const firmaEl   = document.getElementById("firma");

let abierta     = false;
let escribiendo = false;
let saltar      = false;

const reduceMov = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (reduceMov) { VELOCIDAD_TECLA = 8; PAUSA_LINEA = 100; }

const LINEAS = [SALUDO, ...MENSAJE, DESPEDIDA];

const sleep = ms => new Promise(r => setTimeout(r, ms));

/* ═══════════════════════════════════════════════════════════════
   APERTURA DEL SOBRE (secuencia del murciélago)
   ═══════════════════════════════════════════════════════════════ */

async function abrirCarta() {
  if (abierta) return;
  abierta = true;

  // 1) La cera se resquebraja y los murciélaguecillos huyen
  seal.classList.add("crack");
  await sleep(520);

  // 2) La solapa gira en 3D
  flap.classList.add("open");
  scene.classList.add("flap-open");
  await sleep(500);
  flap.classList.add("behind");
  await sleep(560);

  // 3) La carta emerge aleteando
  letter.classList.add("rise");
  await sleep(1020);

  // 4) La carta flota al centro y crece; el sobre se recede
  letter.classList.add("free");
  scene.classList.add("is-open");
  await sleep(950);

  iniciarCarta();
}

/* ═══════════════════════════════════════════════════════════════
   ESCRITURA DE LA CARTA (efecto máquina de escribir)
   ═══════════════════════════════════════════════════════════════ */

async function iniciarCarta() {
  // Título
  const titulo = document.createElement("h2");
  titulo.id = "tituloCarta";
  titulo.className = "carta-titulo";
  titulo.textContent = TITULO;
  mensajeEl.prepend(titulo);

  // Firma (se muestra al terminar)
  firmaEl.innerHTML = "";
  const sign = document.createElement("span");
  sign.className = "sign";
  sign.textContent = FIRMA;
  firmaEl.append(sign);
  firmaEl.append(document.createTextNode(" "));
  const latido = document.createElement("span");
  latido.className = "latido";
  latido.textContent = "♥";
  firmaEl.append(latido);

  escribirLineas();
}

async function escribirLineas() {
  escribiendo = true;

  const cursor = document.createElement("span");
  cursor.className = "cursor";

  let i = 0;

  const siguiente = async () => {
    if (i >= LINEAS.length) { terminar(cursor); return; }

    const texto = LINEAS[i];
    const p = document.createElement("p");

    if (texto.trim() === "") {          // línea vacía = separador
      mensajeEl.appendChild(p);
      i++;
      siguiente();
      return;
    }

    if (i === LINEAS.length - 1) p.classList.add("ultimo");
    mensajeEl.appendChild(p);

    let j = 0;
    const tick = async () => {
      if (saltar) j = texto.length;
      p.textContent = texto.slice(0, j);
      p.appendChild(cursor);
      mensajeEl.scrollTop = mensajeEl.scrollHeight;

      if (j < texto.length) {
        j++;
        await sleep(VELOCIDAD_TECLA + Math.random() * 40);
        tick();
      } else {
        i++;
        await sleep(PAUSA_LINEA);
        siguiente();
      }
    };
    tick();
  };

  siguiente();
}

function terminar(cursor) {
  escribiendo = false;
  cursor.remove();
  firmaEl.querySelectorAll(".latido").forEach(l => l.classList.add("visible"));
  setTimeout(() => {
    mensajeEl.scrollTo({ top: 0, behavior: reduceMov ? "auto" : "smooth" });
  }, 600);
}

/* ═══════════════════════════════════════════════════════════════
   EVENTOS
   ═══════════════════════════════════════════════════════════════ */

scene.addEventListener("click", abrirCarta);

scene.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    abrirCarta();
  }
});

letter.addEventListener("click", () => {
  if (escribiendo) saltar = true;
});

/* ═══════════════════════════════════════════════════════════════
   FONDO: CAMPO DE FLORES NOCTURNO — generación dinámica
   ═══════════════════════════════════════════════════════════════ */

(function(){
  "use strict";

  var azar = function(min, max){ return min + Math.random() * (max - min); };

  function yAtras(x){  return 58 + 7*Math.sin(x/14 + 1.2) + 3*Math.sin(x/6); }
  function yMedio(x){  return 69 + 5*Math.sin(x/11 + 3.0) + 2.5*Math.sin(x/5 + 1); }
  function yFrente(x){ return 81 + 4*Math.sin(x/9 + 0.5) + 2.0*Math.sin(x/4.2 + 2); }

  function trazarColina(id, funcion){
    var puntos = [];
    for (var x = 0; x <= 100; x += 2){ puntos.push(x.toFixed(2) + "," + funcion(x).toFixed(2)); }
    document.getElementById(id).setAttribute("d",
      "M0," + funcion(0).toFixed(2) +
      " L" + puntos.join(" L") +
      " L100,100 L0,100 Z");
  }
  trazarColina("colinaAtras",  yAtras);
  trazarColina("colinaMedio",  yMedio);
  trazarColina("colinaFrente", yFrente);

  var estrellas = document.getElementById("estrellas");
  for (var i = 0; i < 95; i++){
    var e = document.createElement("span");
    e.className = "estrella";
    var tam = azar(1, 2.6);
    e.style.width  = tam + "px";
    e.style.height = tam + "px";
    e.style.left   = azar(0, 100) + "%";
    e.style.top    = azar(0, 58) + "%";
    e.style.setProperty("--d", azar(1.6, 4.2) + "s");
    e.style.setProperty("--delay", -azar(0, 4) + "s");
    estrellas.appendChild(e);
  }

  var flores = document.getElementById("flores");

  function crearFlor(x, y, tam, opacidad){
    var f = document.createElement("span");
    f.className = "flor";
    f.style.left = x + "%";
    f.style.top  = y + "%";
    f.style.width = f.style.height = tam + "px";
    f.style.opacity = opacidad;
    f.style.setProperty("--tal", (tam * azar(0.9, 1.5)).toFixed(1) + "px");
    f.style.setProperty("--dur", azar(2.8, 5.5) + "s");
    f.style.setProperty("--delay", -azar(0, 5) + "s");
    f.style.setProperty("--amp", azar(3.5, 9).toFixed(1) + "deg");
    f.style.fontSize = tam + "px";
    f.innerHTML = '<span class="tallo"></span><span class="cabeza"></span>';
    flores.appendChild(f);
  }

  for (var j = 0; j < 48; j++){
    var xl = azar(0, 100);
    crearFlor(xl, yMedio(xl) + azar(0.5, 2.5), azar(3, 5.5), azar(.45, .7));
  }
  for (var w = 0; w < 50; w++){
    crearFlor(azar(0, 100), azar(72.5, 80), azar(4.5, 7), azar(.55, .8));
  }
  for (var k = 0; k < 105; k++){
    var x = azar(0, 100);
    var borde = yFrente(x);
    var y = borde + azar(0.5, 9);
    var prof = Math.min(Math.max(y - 76, 0), 18);
    crearFlor(x, y, azar(6, 9) + prof * 0.75, azar(.75, 1));
  }

  var luciernagas = document.getElementById("luciernagas");
  for (var m = 0; m < 26; m++){
    var l = document.createElement("span");
    l.className = "luz";
    l.style.setProperty("--x", azar(0, 100) + "%");
    l.style.setProperty("--tam", azar(3.5, 7) + "px");
    l.style.setProperty("--dur", azar(12, 22) + "s");
    l.style.setProperty("--delay", -azar(0, 20) + "s");
    luciernagas.appendChild(l);
  }

  var petalos = document.getElementById("petalos");
  var colores = [
    "linear-gradient(135deg,#ffffff,#ffe9f2)",
    "linear-gradient(135deg,#ffe4ee,#f9a8c2)",
    "linear-gradient(135deg,#fff6e8,#ffd9a8)",
    "linear-gradient(135deg,#fde2ef,#e88fb2)",
    "linear-gradient(135deg,#f2fbff,#cfe9ff)"
  ];
  for (var p = 0; p < 34; p++){
    var pe = document.createElement("span");
    pe.className = "petalo";
    pe.style.setProperty("--x", azar(-2, 100) + "%");
    pe.style.setProperty("--tam", azar(11, 21) + "px");
    pe.style.setProperty("--dur", azar(9, 15) + "s");
    pe.style.setProperty("--delay", -azar(0, 14) + "s");
    var hoja = document.createElement("i");
    hoja.style.background = colores[p % colores.length];
    hoja.style.setProperty("--gir", azar(2.2, 4) + "s");
    pe.appendChild(hoja);
    petalos.appendChild(pe);
  }
})();