/* ═══════════════════════════════════════════════════════════════
   SOBRE SORPRESA PARA NAYDÚ — JavaScript Vanilla
   Fondo: campo de flores nocturno
   Sobre: murciélago (sello, solapa 3D, carta que sale)
   Escritura: máquina de escribir (mensaje personalizable)
   ═══════════════════════════════════════════════════════════════ */

 /* ┌──────────────────────────────────────────────────────────┐
    │  ESCRIBE AQUÍ TU MENSAJE PERSONALIZADO                    │
    │  (solo edita las líneas de abajo, entre comillas)         │
    └──────────────────────────────────────────────────────────┘ */

const TITULO    = "Para Naydú";          // Encabezado de la carta
const SALUDO    = "¡Hola, hermosa!";     // Primera línea

// Tu mensaje: una línea de texto entre comillas, separadas por comas.
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
  await sleep(500);                  // mitad del giro…
  flap.classList.add("behind");      // …pasa detrás del sobre
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
      if (saltar) j = texto.length;     // un toque acelera todo
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
  // Al terminar, la carta vuelve suavemente al inicio para leerse completa
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

// Un toque sobre la carta mientras escribe la completa al instante
letter.addEventListener("click", () => {
  if (escribiendo) saltar = true;
});
