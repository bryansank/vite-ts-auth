import { SpotifySocialLogin } from "./socialmedia/spotify/spotify";

const executeLogin: () => HTMLElement = () => {
  const container: HTMLElement = document.createElement("div");
  container.innerHTML = `
        <h1>Esto es Login View</h1>
        <p>This is the login page.</p>
        <button type="button" id="spotify-login-button">Entrar con Spotify</button>
        <button type="button" id="twitter-login-button" class="desactivateBtn" disabled>Entrar con Twitter</button>
        <button type="button" id="discord-login-button" class="desactivateBtn" disabled>Entrar con Discord</button>
      `;

  const spotifyButton: HTMLElement | null = container.querySelector(
    "#spotify-login-button"
  );

  if (spotifyButton) {
    spotifyButton.addEventListener(
      "click",
      (event) => SpotifySocialLogin(event) // event por si se necesita...
    );
  } else {
    // throw new Error("Error while execute Login");
  }

  return container;
};

export function renderLogin(): HTMLElement {
  const container: HTMLElement = executeLogin();

  return container;
}
