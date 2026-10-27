/* ═══════════════════════════════════════════════════════════════
   SOBRE SORPRESA PARA NAYDÚ — JavaScript Vanilla
   Fondo: campo de flores nocturno
   Sobre: murciélago (sello, solapa 3D, aurora, motas, migas)
   Carta: original (tema morado/rosa) 100% opaca como card grande
   Escritura: máquina de escribir (mensaje personalizable)
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

const scene      = document.getElementById("scene");
const envelope   = document.getElementById("envelope");
const flap       = document.getElementById("flap");
const carta      = document.getElementById("carta");
const papelCarta = carta.querySelector(".carta-papel");
const cerrarBtn  = document.getElementById("cerrarCarta");
const pistaCarta = document.getElementById("pistaCarta");
const seal       = document.getElementById("seal");
const mensajeEl  = document.getElementById("mensaje");
const firmaEl    = document.getElementById("firma");
const musica     = document.getElementById("musica-fondo");
const btnMusica  = document.getElementById("btn-musica");

let ocupada     = false;
let estado      = "sellado";   // sellado | abriendo | abierto | cerrando
let escribiendo = false;
let escrituraToken = 0;

const reduceMov = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (reduceMov) { VELOCIDAD_TECLA = 8; PAUSA_LINEA = 100; }

// En modo "reducir movimiento" también acortamos la secuencia de apertura,
// para no hacer esperar una animación que ya no se está viendo.
const RITMO = reduceMov ? 0.22 : 1;

const LINEAS = [SALUDO, ...MENSAJE, DESPEDIDA];

const sleep = ms => new Promise(r => setTimeout(r, ms));

/* ═══════════════════════════════════════════════════════════════
   APERTURA DEL SOBRE (secuencia del nuevo murciélago)
   ═══════════════════════════════════════════════════════════════ */

function actualizarBotonMusica() {
  if (!btnMusica || !musica) return;
  const activa = !musica.paused;
  btnMusica.setAttribute("aria-pressed", String(activa));
  btnMusica.setAttribute("aria-label", activa ? "Desactivar música" : "Activar música");
  btnMusica.title = activa ? "Desactivar música" : "Activar música";
}

function reproducirMusica() {
  if (!musica) return;
  musica.play().then(actualizarBotonMusica).catch(() => {
    // Navegador bloqueó autoplay; se activará en la próxima interacción del usuario
    actualizarBotonMusica();
  });
}

async function abrirCarta() {
  if (ocupada || estado !== "sellado") return;
  ocupada = true; estado = "abriendo";
  envelope.setAttribute("aria-expanded", "true");

  // Activar música en la primera interacción del usuario
  reproducirMusica();

  // 1) La cera se resquebraja: migas caen, murciélaguecillos huyen
  seal.classList.add("crack");
  await sleep(520 * RITMO);

  // 2) La solapa gira en 3D con rebote de papel
  flap.classList.add("open");
  scene.classList.add("flap-open");
  await sleep(500 * RITMO);             // mitad del giro…
  flap.classList.add("behind");         // …pasa detrás del sobre
  await sleep(700 * RITMO);

  // 3) El interior despierta: aurora, labio de luz, motas y hoja asomando
  scene.classList.add("is-open");
  await sleep(750 * RITMO);

  // 4) La carta emerge majestuosa y centrada a pantalla completa
  scene.classList.add("carta-activa");
  carta.classList.add("free", "abierta");
  carta.setAttribute("aria-hidden", "false");
  document.body.classList.add("carta-abierta");
  await sleep(850 * RITMO);

  estado = "abierto"; ocupada = false;
  iniciarCarta();
  if (cerrarBtn) cerrarBtn.focus({ preventScroll: true });
}

/* ═══════════════════════════════════════════════════════════════
   CIERRE DE LA CARTA (vuelve al sobre)
   ═══════════════════════════════════════════════════════════════ */

async function cerrarCarta() {
  if (ocupada || estado !== "abierto") return;
  ocupada = true; estado = "cerrando";

  detenerEscritura();
  ocultarPista();
  document.body.classList.remove("carta-abierta");
  carta.setAttribute("aria-hidden", "true");
  carta.classList.remove("free", "abierta");
  scene.classList.remove("carta-activa");
  await sleep(750 * RITMO);

  scene.classList.remove("is-open");  // la luz se apaga
  await sleep(600 * RITMO);

  scene.classList.remove("flap-open");
  flap.classList.remove("open");      // la solapa vuelve a cerrarse
  await sleep(500 * RITMO);
  flap.classList.remove("behind");
  await sleep(750 * RITMO);

  seal.classList.remove("crack");     // la cera se restaura sola
  await sleep(650 * RITMO);

  estado = "sellado"; ocupada = false;
  envelope.setAttribute("aria-expanded", "false");
  envelope.focus({ preventScroll: true });
}

function alternar(){
  if (estado === "sellado") abrirCarta();
  else if (estado === "abierto") cerrarCarta();
}

/* ═══════════════════════════════════════════════════════════════
   ESCRITURA DE LA CARTA (efecto máquina de escribir)
   ═══════════════════════════════════════════════════════════════ */

function mostrarPista() {
  if (pistaCarta) pistaCarta.classList.remove("oculta");
}

function ocultarPista() {
  if (pistaCarta) pistaCarta.classList.add("oculta");
}

function detenerEscritura() {
  escrituraToken++;
  escribiendo = false;
}

async function iniciarCarta() {
  // Título
  const titulo = document.getElementById("tituloCarta");
  if (titulo) titulo.textContent = TITULO;

  // Limpiar por si la carta se cerró y se volvió a abrir
  mensajeEl.innerHTML = "";
  firmaEl.textContent = "";
  firmaEl.append(FIRMA, " ", crearLatido());
  firmaEl.classList.remove("visible");
  if (papelCarta) papelCarta.scrollTop = 0;

  mostrarPista();
  escribirLineas();
}

function crearLatido() {
  const s = document.createElement("span");
  s.className = "latido";
  s.textContent = "♥";
  return s;
}

/* Convierte el enlace de YouTube en un enlace legible y clickeable. */
function enlazarUrls() {
  if (!mensajeEl) return;
  mensajeEl.querySelectorAll("p").forEach((p) => {
    const texto = p.textContent.trim();
    if (!/^https?:\/\/\S+$/.test(texto)) return;

    p.className = "cancion-contenedor";
    const enlace = document.createElement("a");
    enlace.href = texto;
    enlace.target = "_blank";
    enlace.rel = "noopener noreferrer";
    enlace.className = "enlace-cancion";
    enlace.innerHTML = '<span class="icono-enlace">♫</span> <span class="texto-enlace">Escuchar nuestra canción (Darviin)</span>';

    p.textContent = "";
    p.appendChild(enlace);
  });
}

async function escribirLineas() {
  const token = ++escrituraToken;
  escribiendo = true;

  const cursor = document.createElement("span");
  cursor.className = "cursor";

  let i = 0;

  const siguiente = async () => {
    if (token !== escrituraToken) return;
    if (i >= LINEAS.length) { terminar(cursor, token); return; }

    const texto = LINEAS[i];
    const p = document.createElement("p");

    if (texto.trim() === "") {          // línea vacía = separador
      mensajeEl.appendChild(p);
      i++;
      siguiente();
      return;
    }

    // Si es enlace URL (ej. la canción de YouTube), lo agregamos directo con estilo
    if (/^https?:\/\/\S+$/.test(texto.trim())) {
      p.className = "cancion-contenedor";
      const enlace = document.createElement("a");
      enlace.href = texto.trim();
      enlace.target = "_blank";
      enlace.rel = "noopener noreferrer";
      enlace.className = "enlace-cancion";
      enlace.innerHTML = '<span class="icono-enlace">♫</span> <span class="texto-enlace">Escuchar nuestra canción (Darviin)</span>';
      p.appendChild(enlace);
      mensajeEl.appendChild(p);

      if (papelCarta) papelCarta.scrollTop = papelCarta.scrollHeight;

      i++;
      await sleep(PAUSA_LINEA + 200);
      if (token !== escrituraToken) return;
      siguiente();
      return;
    }

    if (i === LINEAS.length - 1) p.classList.add("ultimo");
    mensajeEl.appendChild(p);

    let j = 0;
    const tick = async () => {
      if (token !== escrituraToken) return;

      p.textContent = texto.slice(0, j);
      p.appendChild(cursor);

      // Solo sigue el scroll si la persona está leyendo cerca del final;
      // si subió a releer algo, no se lo arrebatamos.
      if (papelCarta) {
        const cercaDelFondo =
          papelCarta.scrollHeight - papelCarta.scrollTop - papelCarta.clientHeight < 80;
        if (cercaDelFondo) papelCarta.scrollTop = papelCarta.scrollHeight;
      }

      if (j < texto.length) {
        j++;
        await sleep(VELOCIDAD_TECLA + Math.random() * 40);
        if (token !== escrituraToken) return;
        tick();
      } else {
        i++;
        await sleep(PAUSA_LINEA);
        if (token !== escrituraToken) return;
        siguiente();
      }
    };
    tick();
  };

  siguiente();
}

function terminar(cursor, token) {
  if (token !== escrituraToken) return;
  escribiendo = false;
  cursor.remove();
  firmaEl.classList.add("visible");
  ocultarPista();
  enlazarUrls();
}

/* Si se toca la carta mientras escribe, se muestra completa al instante. */
function completarCarta() {
  if (!escribiendo) return;

  escrituraToken++;
  escribiendo = false;
  mensajeEl.innerHTML = "";

  LINEAS.forEach((texto, i) => {
    const p = document.createElement("p");
    if (texto.trim() === "") {
      mensajeEl.appendChild(p);
      return;
    }

    if (/^https?:\/\/\S+$/.test(texto.trim())) {
      p.className = "cancion-contenedor";
      const enlace = document.createElement("a");
      enlace.href = texto.trim();
      enlace.target = "_blank";
      enlace.rel = "noopener noreferrer";
      enlace.className = "enlace-cancion";
      enlace.innerHTML = '<span class="icono-enlace">♫</span> <span class="texto-enlace">Escuchar nuestra canción (Darviin)</span>';
      p.appendChild(enlace);
      mensajeEl.appendChild(p);
      return;
    }

    if (i === LINEAS.length - 1) p.classList.add("ultimo");
    p.textContent = texto;
    mensajeEl.appendChild(p);
  });

  firmaEl.classList.add("visible");
  ocultarPista();
  enlazarUrls();
  if (papelCarta) papelCarta.scrollTop = 0;
}

/* ── Estallido de corazones al abrir (estilo original, opcional) ── */

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

    scene.appendChild(chispa);
    setTimeout(() => chispa.remove(), 1400);
  }
}

/* ── Eventos ──────────────────────────────────────────────────── */

scene.addEventListener("click", (e) => {
  // La carta y el botón de música manejan sus propios clics.
  if (e.target.closest("#btn-musica, .carta")) return;
  alternar();
});

scene.addEventListener("keydown", (e) => {
  if (e.key !== "Enter" && e.key !== " ") return;
  if (e.target.closest(".carta, #btn-musica")) return;
  e.preventDefault();
  alternar();
});

// Un toque dentro de la carta completa la escritura, pero ya no la cierra.
carta.addEventListener("click", (e) => {
  if (!carta.classList.contains("free") && !carta.classList.contains("abierta")) return;
  if (e.target.closest("a, button")) return;
  if (escribiendo) completarCarta();
});

if (cerrarBtn) {
  cerrarBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    cerrarCarta();
  });
}

// Escape cierra la carta abierta.
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && estado === "abierto") {
    e.preventDefault();
    cerrarCarta();
  }
});

// Botón de control de música (activa / pausa)
if (btnMusica && musica) {
  btnMusica.addEventListener("click", (e) => {
    e.stopPropagation(); // no disparar clic del sobre
    if (musica.paused) {
      musica.play().catch(() => {});
    } else {
      musica.pause();
    }
  });

  musica.addEventListener("play", actualizarBotonMusica);
  musica.addEventListener("pause", actualizarBotonMusica);
}

// Intento de autoplay al cargar la página (navegadores pueden bloquearlo)
window.addEventListener("load", () => {
  if (musica) {
    musica.play().catch(() => {
      // Bloqueado por el navegador; se activará con la primera interacción
      actualizarBotonMusica();
    });
  }
});

/* ── FONDO: CAMPO DE FLORES NOCTURNO — generación dinámica ─────── */

(function(){
  "use strict";

  var azar = function(min, max){ return min + Math.random() * (max - min); };

  /* Perfil de cada colina (en % de la pantalla) */
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

  /* Estrellas en el cielo alto */
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

  /* Flores: pequeñas en la colina del fondo, grandes adelante */
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

  /* Luces flotantes (semillas de diente de león) */
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

  /* Pétalos cayendo en toda la página */
  var petalos = document.getElementById("petalos");
  if (petalos) {
    var colores = [
      "linear-gradient(135deg, #ff9ebb 0%, #ff6b8b 100%)",
      "linear-gradient(135deg, #ffa8c5 0%, #f77fbe 100%)",
      "linear-gradient(135deg, #ffd3dd 0%, #ff758f 100%)",
      "linear-gradient(135deg, #ffb3c1 0%, #fb6f92 100%)",
      "linear-gradient(135deg, #ff758c 0%, #e04368 100%)",
      "linear-gradient(135deg, #ffeef2 0%, #ff85a1 100%)"
    ];
    var ancho = window.innerWidth || document.documentElement.clientWidth || 1200;
    var totalPetalos = ancho > 1200 ? 55 : (ancho > 768 ? 42 : 28);
    var escalaPetalo = Math.min(1.4, Math.max(0.95, ancho / 1200));

    petalos.innerHTML = "";
    for (var p = 0; p < totalPetalos; p++){
      var pe = document.createElement("span");
      pe.className = "petalo";
      var tamBase = azar(16, 28) * escalaPetalo;
      pe.style.setProperty("--x", azar(-4, 104).toFixed(2) + "%");
      pe.style.setProperty("--tam", tamBase.toFixed(1) + "px");
      pe.style.setProperty("--dur", azar(9, 16).toFixed(1) + "s");
      pe.style.setProperty("--delay", (-azar(0, 16)).toFixed(1) + "s");
      pe.style.setProperty("--drift", azar(-6, 8).toFixed(1) + "vw");
      pe.style.setProperty("--rot-end", azar(180, 420).toFixed(0) + "deg");

      var hoja = document.createElement("i");
      hoja.style.background = colores[p % colores.length];
      hoja.style.setProperty("--gir", azar(2.5, 4.5).toFixed(1) + "s");
      hoja.style.setProperty("--rot-ini", azar(-30, 30).toFixed(1) + "deg");
      pe.appendChild(hoja);
      petalos.appendChild(pe);
    }
  }
})();