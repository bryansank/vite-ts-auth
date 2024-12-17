import { SpotifyUtilsAuth } from "../../../utils/spotify/auth";

const spotifyUtilsAuth: SpotifyUtilsAuth = new SpotifyUtilsAuth();

const changeButton: (event: Event) => void = (event: Event) => {
  const btn: HTMLElement = event.target as HTMLElement;
  btn.textContent = "Cargando...";
  btn.style.cursor = "progress";
};

export const SpotifySocialLogin: (event: Event) => void = (event: Event) => {
  event.preventDefault();

  changeButton(event);

  spotifyUtilsAuth.generateAuth();

  return;
};
