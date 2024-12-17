import "./assets/style.css";
import { renderNavContainer } from "./nav";
import { routerFn } from "./router";
import { Utils } from "./utils/utilsFn";

const utils = new Utils();

async function renderRouter(): Promise<void> {
  const app: HTMLElement | null = document.getElementById("app");
  const nav: HTMLElement | null = document.getElementById("nav");

  // meterle traduccion  TODO
  if (!app) throw new Error("No se encontró el elemento #app");
  if (!nav) throw new Error("No se encontró el elemento #nav");

  app.innerHTML = "";
  nav.innerHTML = "";

  nav.appendChild(renderNavContainer());

  await switchRouter(app);

  return;
}

async function switchRouter(app: HTMLElement): Promise<void> {
  await routerFn(app); //appendChild is mutable
  return;
}

// Escucha los cambios en el historial de rutas,
// evento de atras o adelante en el historial.
// No afecta el cambio de URL.
window.addEventListener("popstate", async () => {
  await renderRouter();
});

window.setInterval(() => {
  // console.log(":asdsad");

  utils.createIntervalCheckSpotifyExpiredSession();
}, 1000);

window.addEventListener("DOMContentLoaded", async () => {
  // Renderiza la ruta inicial
  await renderRouter();
});
