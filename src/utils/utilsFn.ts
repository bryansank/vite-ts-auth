import { htmlTags } from "./constants/tags";
import { SessionUtils } from "./sessionStg";
import { SpotifyUtilsAuth } from "./spotify/auth";

export class Utils {
  private intervalId: number | null = null; // Referencia al intervalo
  private _spotifyUtilsAuth?: SpotifyUtilsAuth;
  private _sessionSTG?: SessionUtils;

  get sessionSTG(): SessionUtils {
    if (!this._sessionSTG) {
      this._sessionSTG = new SessionUtils();
    }
    return this._sessionSTG;
  }

  get spotifyUtilsAuth(): SpotifyUtilsAuth {
    if (!this._spotifyUtilsAuth) {
      this._spotifyUtilsAuth = new SpotifyUtilsAuth();
    }
    return this._spotifyUtilsAuth;
  }

  public createdContainerFunc: (element: string) => HTMLElement = (
    element: string
  ) => {
    const arrayValidStringHTMLElements: string[] = htmlTags;
    if (element === "" || !arrayValidStringHTMLElements.includes(element)) {
      throw new Error("Error when generate html element;");
    }
    return document.createElement(element) as HTMLElement;
  };

  public capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  public goToUrl(url: string): void {
    window.location.href = url;
  }

  public generateGenericContainer(): HTMLElement {
    const container: HTMLElement = document.createElement("div");
    container.innerHTML = `
        <span></span>
      `;
    return container;
  }

  public createIntervalCheckSpotifyExpiredSession() {
    const spotifyTokenDuration: string =
      this.sessionSTG.getItem("spotify_token_time") || "";

    if (this.isValidExpirationTime(spotifyTokenDuration)) {
      const tokenDurationSec = parseInt(spotifyTokenDuration, 10); // Duración en segundos
      const tokenIssueTimeSec = Math.floor(Date.now() / 1000); // Momento actual (cuando el token fue emitido)
      const expirationTimeSec = tokenIssueTimeSec + tokenDurationSec; // Calcula el tiempo de exp real

      // console.log("Debug: Duración del token (segundos):", tokenDurationSec);
      // console.log(
      //   "Debug: Tiempo de emisión del token (segundos):",
      //   tokenIssueTimeSec
      // );
      // console.log("Debug: Tiempo de expiración calculado:", expirationTimeSec);

      this.startTokenExpirationCheck(expirationTimeSec);
    }
  }

  private startTokenExpirationCheck(expirationTimeSec: number) {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
    }

    this.intervalId = window.setInterval(() => {
      const currentTimeSec = Math.floor(Date.now() / 1000);
      const timeRemaining = expirationTimeSec - currentTimeSec;

      // console.log("Debug: ", {
      //   expirationTimeSec,
      //   currentTimeSec,
      //   timeRemaining,
      // });

      if (timeRemaining <= 0) {
        // console.log("El token ha expirado. Redirigiendo...");
        this.goToUrl("/");

        if (this.intervalId !== null) {
          clearInterval(this.intervalId);
          this.intervalId = null;
        }
      } else {
        // console.log(
        //   `El token aún es válido. Tiempo restante: ${timeRemaining} segundos.`
        // );
      }
    }, 1000);
  }

  private isValidExpirationTime(expirationTime: string): boolean {
    return expirationTime !== "" && !isNaN(parseInt(expirationTime, 10));
  }
}
