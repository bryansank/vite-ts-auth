import { IResponseSpotifyToken } from "../../pages/socialmedia/spotify/interfaces/interfaces";
import { SessionUtils } from "../sessionStg";
import { Utils } from "../utilsFn";
import {
  CLAIMS_SPOTIFY,
  REDIRECT_PROXY,
  SPOTIFY_ST,
} from "./constants/options";

const clientId: string = SPOTIFY_ST.SPOTIFY_DEV_CLIENT_ID;
const clientSecret: string = SPOTIFY_ST.SPOTIFY_DEV_SECRET;
const credentials: string = btoa(`${clientId}:${clientSecret}`.trim());
const DEV_MODE = true;

export class SpotifyUtilsAuth {
  private _utils?: Utils;
  sessionUtils: SessionUtils = new SessionUtils();

  get utils(): Utils {
    if (!this._utils) {
      this._utils = new Utils();
    }
    return this._utils;
  }

  async refreshAccessToken() {
    const refreshTokenSTorage: string = this.sessionUtils.getItem(
      "spotify_token_refresh_session"
    );

    if (refreshTokenSTorage === "") {
      throw new Error("Token refresh don't exist");
    }

    let urlToken: string = "";

    if (DEV_MODE) {
      urlToken = `${REDIRECT_PROXY}${SPOTIFY_ST.SPOTIFY_TOKEN}`;
    } else {
      urlToken = `${SPOTIFY_ST.SPOTIFY_TOKEN}`;
    }

    const response = await this.fetchRefreshToken(
      urlToken,
      credentials,
      refreshTokenSTorage
    );

    if (!response.ok) {
      console.error("Error while refresh token: ", await response.json());
      return this.utils.goToUrl("/");
    }

    const data: IResponseSpotifyToken = await response.json();
    this.sessionUtils.setItem("spotify_token_session", data.access_token);
    this.sessionUtils.setItem("spotify_logged", true);
    this.sessionUtils.setItem("spotify_token_time", data.expires_in);

    return;
  }

  async generateAuth() {
    const SPOTIFY_OPTIONS = {
      response_type: "code",
      client_id: SPOTIFY_ST.SPOTIFY_DEV_CLIENT_ID,
      scope: CLAIMS_SPOTIFY.join(" "),
      redirect_uri: SPOTIFY_ST.SPOTIFY_REDIRECT_URL,
    };

    const paramsUrlTypeQuery: string =
      new URLSearchParams(SPOTIFY_OPTIONS).toString() || "";
    const urlFormat: string =
      `${SPOTIFY_ST.SPOTIFY_AUTH}?${paramsUrlTypeQuery}` || "";

    if (paramsUrlTypeQuery === "" || urlFormat === "") {
      throw new Error("Error with URL formats");
    }

    return this.utils.goToUrl(urlFormat); // this go to url-spotify login and then call callback-spotifyurl
  }

  //
  private async fetchRefreshToken(
    URL_TOKEN: string,
    credentials: string,
    refreshToken: string
  ) {
    return await fetch(URL_TOKEN, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${credentials}`,
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      }),
    });
  }
}
