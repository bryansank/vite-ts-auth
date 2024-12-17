import { REDIRECT_PROXY, SPOTIFY_ST } from "./constants/options";
import { SessionUtils } from "../sessionStg";
import { Utils } from "../utilsFn";
import { IResponseSpotifyToken } from "../../pages/socialmedia/spotify/interfaces/interfaces";

const utilsClass: Utils = new Utils();
const sessionStorageClass: SessionUtils = new SessionUtils();

const getToken: () => Promise<any> = async () => {
  const codeAuth: string =
    window.location.search.toString().split("=")[1] || "";

  if (!codeAuth || codeAuth === "") {
    return utilsClass.goToUrl("/");
  }

  const base64Bearer: string = window.btoa(
    `${SPOTIFY_ST.SPOTIFY_DEV_CLIENT_ID}:${SPOTIFY_ST.SPOTIFY_DEV_SECRET}`
  );
  const bodyParam: URLSearchParams = new URLSearchParams({
    grant_type: "authorization_code",
    code: codeAuth,
    redirect_uri: SPOTIFY_ST.SPOTIFY_REDIRECT_URL,
  });

  let urlToken: string = "";
  if (true) {
    //mode_dev
    urlToken = `${REDIRECT_PROXY}${SPOTIFY_ST.SPOTIFY_TOKEN}`;
  }

  return await fetch(urlToken, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${base64Bearer}`,
    },
    body: bodyParam,
  })
    .then((d) => {
      if (d.status === 200) {
        return d.json();
      } else {
        return utilsClass.goToUrl("/");
      }
    })
    .catch((error) => {
      console.log(
        "Error while generate Token/Spotify: ",
        error.message || error
      );
      return utilsClass.goToUrl("/");
    });
};

// codigo backend (getToken)
export const fnCallBackSpotifyToken: () => void = async () => {
  try {
    const data: IResponseSpotifyToken = await getToken();

    sessionStorageClass.setItem("spotify_token_session", data.access_token);
    sessionStorageClass.setItem(
      "spotify_token_refresh_session",
      data.refresh_token
    );
    sessionStorageClass.setItem("spotify_logged", true);
    sessionStorageClass.setItem("spotify_token_time", data.expires_in);

    return utilsClass.goToUrl("/spotify-data");
  } catch (error) {
    return utilsClass.goToUrl("/");
  }
};
