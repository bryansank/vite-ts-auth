import { renderHome } from "./pages/home";
import { renderAbout } from "./pages/about";
import { renderNotFound } from "./pages/notfound";
import { renderLogin } from "./pages/login";
import { renderDataSpotify } from "./pages/socialmedia/spotify/userData/data";
import { fnCallBackSpotifyToken } from "./utils/spotify/callback";

export async function routerFn(appContainer: HTMLElement) {
  const { pathname } = window.location; //url nav

  // meterlo en navOptions tambien
  switch (pathname) {
    case "/":
      {
        appContainer.appendChild(renderHome());
      }
      break;
    case "/about":
      {
        appContainer.appendChild(renderAbout());
      }
      break;
    case "/login":
      {
        appContainer.appendChild(renderLogin());
      }
      break;
    case "/spotify-data":
      {
        const element: HTMLElement | void = await renderDataSpotify();
        if (!element) {
          const containerVoid: HTMLElement = document.createElement("span");
          appContainer.appendChild(containerVoid);
        } else {
          appContainer.appendChild(element);
        }
      }
      break;
    case "/api/callback-spotify":
      {
        fnCallBackSpotifyToken();
      }
      break;

    default:
      appContainer.appendChild(renderNotFound());
      break;
  }

  return; // se mdifica appcontainer (mutable);
}
