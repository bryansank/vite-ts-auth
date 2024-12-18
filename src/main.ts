import "./assets/style.css";
import { renderNavContainer } from "./nav";
import { routerFn } from "./router";
import { revalidateSpotifySDK } from "./utils/spotifySdk";

const renderRouter: () => Promise<void> = async () => {
  const app: HTMLElement | null = document.getElementById("app");
  const nav: HTMLElement | null = document.getElementById("nav");

  if (!app) throw new Error("No se encontró el elemento #app");
  if (!nav) throw new Error("No se encontró el elemento #nav");

  app.innerHTML = "";
  nav.innerHTML = "";

  nav.appendChild(renderNavContainer());
  await routerFn(app);
};

// events
window.addEventListener("DOMContentLoaded", async () => {
  await renderRouter();

  try {
    await revalidateSpotifySDK();
  } catch (error) {
    console.error("Error al cargar el Spotify SDK:", error);
  }
});
