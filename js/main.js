// Pone el año actual en el pie de página
const anio = document.getElementById("year");
if (anio) anio.textContent = new Date().getFullYear();

// Estela del cursor (solo en computador con mouse)
if (window.matchMedia("(hover: hover)").matches) {
  const CANTIDAD = 10;      // cantidad de puntos de la estela
  const SUAVIDAD = 0.35;    // menor = estela más larga y lenta (0.1 a 0.6)
  const puntos = [];
  const mouse = { x: 0, y: 0, activo: false };

  for (let i = 0; i < CANTIDAD; i++) {
    const el = document.createElement("div");
    const t = 1 - i / CANTIDAD;            // 1 = cabeza, 0 = cola
    el.className = "trail-dot";
    el.style.width = el.style.height = 4 + t * 10 + "px";
    el.style.opacity = 0;
    document.body.appendChild(el);
    puntos.push({ el, x: 0, y: 0, o: t * 0.8 });
  }

  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    if (!mouse.activo) {                   // primera vez: aparecen en el cursor
      mouse.activo = true;
      puntos.forEach((p) => { p.x = mouse.x; p.y = mouse.y; p.el.style.opacity = p.o; });
    }
  });

  document.addEventListener("mouseleave", () => puntos.forEach((p) => (p.el.style.opacity = 0)));
  document.addEventListener("mouseenter", () => puntos.forEach((p) => (p.el.style.opacity = p.o)));

  function animar() {
    let x = mouse.x, y = mouse.y;
    for (const p of puntos) {
      p.x += (x - p.x) * SUAVIDAD;
      p.y += (y - p.y) * SUAVIDAD;
      p.el.style.transform = `translate(${p.x}px, ${p.y}px) translate(-50%, -50%)`;
      x = p.x; y = p.y;
    }
    requestAnimationFrame(animar);
  }
  animar();
}