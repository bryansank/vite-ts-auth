import "../../assets/style.css";
import btnSpotify from "./logicSpotify";

// Crear un componente HTML dinámico
const SpotifySocialLogin = (): HTMLElement => {
  const mainSection: HTMLElement = document.createElement("section");

  const div: HTMLElement = document.createElement("div");
  const buttonSpotify: HTMLElement = document.createElement("button");
  buttonSpotify.textContent = "Iniciar sesion con Spotify";
  buttonSpotify.addEventListener("click", () => btnSpotify());

  div.appendChild(buttonSpotify);

  const allComponents: HTMLElement[] = [];
  allComponents.push(div);

  allComponents.map((e: HTMLElement) => {
    mainSection.appendChild(e);
  });

  return mainSection;
};

export default SpotifySocialLogin;
