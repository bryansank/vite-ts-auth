import {
  // REDIRECT_PROXY,
  SPOTIFY_ST,
} from "../../../../utils/spotify/constants/options";
import { SessionUtils } from "../../../../utils/sessionStg";
import { Utils } from "../../../../utils/utilsFn";

//urls
const GET_INFO_SPOTIFY_URL: string = `${SPOTIFY_ST.SPOTIFY_GETME_DATA_URL}`;

//instances
const utils: Utils = new Utils();
const sessionStorageClass: SessionUtils = new SessionUtils();

const fetchUserProfile = async () => {
  if (!sessionStorageClass.validateHasServiceToken("spotify")) {
    return utils.goToUrl("/");
  } else {
    const token: string = sessionStorageClass.getTokenService("spotify");

    return await fetch(GET_INFO_SPOTIFY_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((r) => {
        return r.json();
      })
      .catch((error) => {
        console.log("Error while get Data/Spotify: ", error.message || error);
        return utils.goToUrl("/");
      });
  }
};

export const renderDataSpotify = async () => {
  sessionStorageClass.validateSessionLogged("spotify");

  const data: {
    country: string;
    display_name: string;
    id: string;
    product: string;
    type: string;
    error?: boolean;
    [key: string]: any;
  } = (await fetchUserProfile()) ?? { error: true };

  if (data.error) {
    return;
  }

  const container = document.createElement("div");
  container.innerHTML = `
  <h2>El usuario: ${data.display_name} 🏳 ${data.country}</h2>
  <span>id: ${data.id}</span>
  `;

  const mar = document.createElement("div");
  mar.style.marginTop = "2rem";
  container.appendChild(mar);

  return container;
};

// codigo de prubeas
// const prueba =()=>{
//   const prueba = () => {
//     console.log("ajkdnqwibdwq");
//   };

//   const containerReproductor = document.createElement("div");
//   containerReproductor.innerHTML = `
//   <button type='button' id='upvol'> Subir Vl.</button>
//   <button type='button' id='downvol'> Bajar Vl.</button>
//   <button type='button' id='after'> >>> </button>
//   <button type='button' id='back'> <<< </button>
//   <button type='button' id='stop'> || </button>
//   <button type='button' id='play'> > </button>
//   `;

//   container.appendChild(containerReproductor);

//   // Asignar eventos a los botones
//   const upvol = containerReproductor.querySelector("#upvol");
//   if (upvol) {
//     upvol.addEventListener("click", prueba);
//   }
//   const downvol = containerReproductor.querySelector("#downvol");
//   if (downvol) {
//     downvol.addEventListener("click", prueba);
//   }
//   const after = containerReproductor.querySelector("#after");
//   if (after) {
//     after.addEventListener("click", prueba);
//   }
//   const back = containerReproductor.querySelector("#back");
//   if (back) {
//     back.addEventListener("click", prueba);
//   }
//   const stop = containerReproductor.querySelector("#stop");
//   if (stop) {
//     stop.addEventListener("click", prueba);
//   }
//   const play = containerReproductor.querySelector("#play");
//   if (play) {
//     play.addEventListener("click", prueba);
//   }
// }

/*
const reproductorfn = async () => {
  const token: string =
    sessionStorageClass.getItem("spotify_token_session") || "";
  if (token === "") {
    // throw new Error("Error, token is empty");
  }

  return await fetch(
    `${REDIRECT_PROXY}${SPOTIFY_ST.SPOTIFY_GETME_DATA_URL}/player`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then((r) => {
      if (r.status === 204) {
        return [];
      } else {
        return r.json();
      }
    })
    .catch((error) => {
      debugger;
      console.log(
        "Error while get Data/Spotify/reproductorfn : ",
        error.message || error
      );
      return utils.goToUrl("/");
    });
};
*/
