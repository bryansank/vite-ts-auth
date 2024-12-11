import "./assets/style.css";
import { setupCounter } from "./counter.ts";
import SpotifySocialLogin from "./socialmedia/spotify/spotify.ts";

function createApp(): HTMLElement {
  const container = document.createElement("div");

  const header = document.createElement("h1");
  header.textContent = "Vite + TypeScript";

  const card = document.createElement("div");
  card.className = "card";

  const button = document.createElement("button");
  button.id = "counter";
  button.type = "button";
  card.appendChild(button);

  const paragraph = document.createElement("p");
  paragraph.className = "read-the-docs";
  paragraph.textContent = "Hola, esta es una aplicación Vite con TypeScript";

  container.appendChild(header);
  container.appendChild(card);
  container.appendChild(paragraph);

  //all
  container.appendChild(SpotifySocialLogin());

  return container;
}

const app = document.querySelector<HTMLDivElement>("#app");
if (app) {
  app.appendChild(createApp());
  setupCounter(document.querySelector<HTMLButtonElement>("#counter")!);
}
