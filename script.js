/* ══════════════════════════════════════════════════════════════
   SOBRE SORPRESA PARA NAYDÚ — JavaScript Vanilla
   ══════════════════════════════════════════════════════════════

   ┌──────────────────────────────────────────────────────────┐
   │  ESCRIBE AQUÍ TU MENSAJE PERSONALIZADO                    │
   │  (solo edita las líneas de abajo, entre comillas)         │
   └──────────────────────────────────────────────────────────┘ */

const TITULO    = "Para Naydú";          // Encabezado de la carta
const SALUDO    = "¡Hola, hermosa!";     // Primera línea

// Tu mensaje: una línea de texto entre comillas, separadas por comas.
// Puedes borrar estas de ejemplo y escribir las tuyas (las que quieras).
const MENSAJE   = [
  "Cada día a tu lado descubro una razón más para sonreír.",
  "Este pequeño rincón de internet lo hice solo para ti,",
  "para recordarte que eres lo más bonito que me ha pasado.",
  "Te pienso, te sonríe el corazón, y decidí escribirlo aquí,",
  "porque hay cosas que merecen algo más que un mensaje cualquiera."
];

const DESPEDIDA = "Con mucho amor.";     // Cierre de la carta
const FIRMA     = "— De quien te ama con todo el corazón"; // Tu firma

/* Velocidades de la escritura (milisegundos) */
let VELOCIDAD_TECLA = 40;   // tiempo entre letras (menor = más rápido)
let PAUSA_LINEA     = 400;  // pausa entre líneas

/* ══════════════════════════════════════════════════════════════
   A partir de aquí no necesitas tocar nada.
   ══════════════════════════════════════════════════════════════ */

const zonaSobre  = document.getElementById("zonaSobre");
const escena     = document.getElementById("escena");
const cartaEl    = document.getElementById("carta");
const mensajeEl  = document.getElementById("mensaje");
const firmaEl    = document.getElementById("firma");
const tituloEl   = document.getElementById("tituloCarta");

let abierta     = false;
let escribiendo = false;
let saltar      = false;

const reduceMov = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (reduceMov) { VELOCIDAD_TECLA = 8; PAUSA_LINEA = 100; }

const LINEAS = [SALUDO, ...MENSAJE, DESPEDIDA];

/* ── Apertura del sobre ─────────────────────────────────────── */

function abrirCarta() {
  if (abierta) return;
  abierta = true;

  document.body.classList.add("abierto");   // solapa gira + hoja sube
  explotarCorazones();

  setTimeout(() => document.body.classList.add("leyendo"), reduceMov ? 200 : 1600);
  setTimeout(iniciarCarta, reduceMov ? 400 : 2700);
}

/* ── Escritura de la carta (efecto máquina de escribir) ────── */

function iniciarCarta() {
  tituloEl.textContent = TITULO;

  firmaEl.textContent = "";
  firmaEl.append(FIRMA, " ", crearLatido());

  escribirLineas();
}

function crearLatido() {
  const s = document.createElement("span");
  s.className = "latido";
  s.textContent = "♥";
  return s;
}

function escribirLineas() {
  escribiendo = true;

  const cursor = document.createElement("span");
  cursor.className = "cursor";

  let i = 0;

  const siguiente = () => {
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
    const tick = () => {
      if (saltar) j = texto.length;     // un toque acelera todo
      p.textContent = texto.slice(0, j);
      p.appendChild(cursor);
      mensajeEl.scrollTop = mensajeEl.scrollHeight;

      if (j < texto.length) {
        j++;
        setTimeout(tick, VELOCIDAD_TECLA + Math.random() * 40);
      } else {
        i++;
        setTimeout(siguiente, PAUSA_LINEA);
      }
    };
    tick();
  };

  siguiente();
}

function terminar(cursor) {
  escribiendo = false;
  cursor.remove();
  firmaEl.classList.add("visible");
  // Al terminar, la carta vuelve suavemente al inicio para leerse completa
  setTimeout(() => {
    mensajeEl.scrollTo({ top: 0, behavior: reduceMov ? "auto" : "smooth" });
  }, 600);
}

/* ── Estallido de corazones al abrir ───────────────────────── */

function explotarCorazones() {
  if (reduceMov) return;

  const colores = ["#ff8fb3", "#ff5d8f", "#ffb3c6", "#e63976", "#f7cad0"];

  for (let k = 0; k < 12; k++) {
    const chispa = document.createElement("span");
    chispa.className = "chispa";

    const ang  = Math.random() * Math.PI * 2;
    const dist = 110 + Math.random() * 140;

    chispa.style.setProperty("--dx", (Math.cos(ang) * dist) + "px");
    chispa.style.setProperty("--dy", (Math.sin(ang) * dist * 0.7 - 70) + "px");
    chispa.style.setProperty("--tam", (10 + Math.random() * 14) + "px");
    chispa.style.setProperty("--c", colores[k % colores.length]);
    chispa.appendChild(document.createElement("i"));

    escena.appendChild(chispa);
    setTimeout(() => chispa.remove(), 1400);
  }
}

/* ── Eventos ───────────────────────────────────────────────── */

zonaSobre.addEventListener("click", abrirCarta);

zonaSobre.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    abrirCarta();
  }
});

// Un toque sobre la carta mientras escribe la completa al instante
cartaEl.addEventListener("click", () => {
  if (escribiendo) saltar = true;
});

/* ═══════════════════════════════════════════════════════════════
   FONDO: CAMPO DE FLORES NOCTURNO — generación dinámica
   ═══════════════════════════════════════════════════════════════ */

(function(){
  "use strict";

  var azar = function(min, max){ return min + Math.random() * (max - min); };

  /* ── Perfil de cada colina (en % de la pantalla) ── */
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

  /* ── Estrellas en el cielo alto ── */
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

  /* ── Flores: pequeñas en la colina del fondo, grandes adelante ── */
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

  /* Flores lejanas (colina media, casi en el horizonte) */
  for (var j = 0; j < 48; j++){
    var xl = azar(0, 100);
    crearFlor(xl, yMedio(xl) + azar(0.5, 2.5), azar(3, 5.5), azar(.45, .7));
  }

  /* Flores del campo medio, llenando la ladera entre las dos colinas */
  for (var w = 0; w < 50; w++){
    crearFlor(azar(0, 100), azar(72.5, 80), azar(4.5, 7), azar(.55, .8));
  }

  /* Flores del frente, más grandes cuanto más abajo (perspectiva) */
  for (var k = 0; k < 105; k++){
    var x = azar(0, 100);
    var borde = yFrente(x);
    var y = borde + azar(0.5, 9);
    var prof = Math.min(Math.max(y - 76, 0), 18);
    crearFlor(x, y, azar(6, 9) + prof * 0.75, azar(.75, 1));
  }

  /* ── Luces flotantes (semillas de diente de león) ── */
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

  /* ── Pétalos cayendo (34, colores claros que brillan en la noche) ── */
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
