═══════════════════════════════════════════════════════
  SOBRE SORPRESA PARA NAYDÚ — Plantilla HTML + CSS + JS
═══════════════════════════════════════════════════════

ARCHIVOS
  index.html  → la estructura de la página (no hace falta tocarla)
  style.css   → los colores y animaciones
  script.js   → el mensaje de la carta y las velocidades

─────────────────────────────────────────────
1) ESCRIBIR TU MENSAJE PERSONALIZADO
─────────────────────────────────────────────
Abre "script.js" con cualquier editor de texto (Bloc de notas sirve).
Arriba del todo verás esto:

  const TITULO    = "Para Naydú";
  const SALUDO    = "¡Hola, hermosa!";
  const MENSAJE   = [
    "Cada día a tu lado descubro una razón más para sonreír.",
    ...
  ];
  const DESPEDIDA = "Con mucho amor.";
  const FIRMA     = "— De quien te ama con todo el corazón";

- Borra las líneas de ejemplo y escribe las tuyas.
- Cada renglón va entre comillas y termina con coma:
    "Primer renglón.",
    "Segundo renglón.",
  (Puedes poner todas las líneas que quieras.)
- Guarda el archivo y listo.

Consejo: prueba primero abriendo "index.html" en tu navegador
(doble clic) antes de subirlo a internet.

─────────────────────────────────────────────
2) CAMBIAR COLORES O VELOCIDAD (opcional)
─────────────────────────────────────────────
- Velocidad de escritura: en "script.js",
    VELOCIDAD_TECLA = 45;   → menos = escribe más rápido
    PAUSA_LINEA     = 420;  → pausa entre renglones

- Colores: en "style.css", al inicio están las variables:
    --papel        → color de la hoja
    --tinta        → color del texto
    --rosa-fuerte  → color de títulos y firma
  El fondo (gradiente púrpura/rosa) está en "body", busca
  "background: linear-gradient".

─────────────────────────────────────────────
3) SUBIRLO A VERCEL (gratis)
─────────────────────────────────────────────
Opción rápida:
  1. Entra a https://vercel.com/new
  2. Arrastra la carpeta completa (con los 3 archivos dentro).
  3. Espera 5 segundos y te da el enlace público.

Opción con GitHub:
  1. Sube la carpeta a un repositorio.
  2. En Vercel: "Add New Project" → importa el repo → Deploy.
  (No necesita configuración: es un sitio estático.)

También funciona en Netlify (https://app.netlify.com/drop)
si algún día lo necesitas.

─────────────────────────────────────────────
NOTAS
─────────────────────────────────────────────
- Funciona en celular y computadora (diseño responsive).
- Si tocas la carta mientras escribe, se completa al instante.
- Accesible con teclado: Tab + Enter también abre el sobre.
- Respeta "prefers-reduced-motion" para quien prefiera menos
  animación.
