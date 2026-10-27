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
