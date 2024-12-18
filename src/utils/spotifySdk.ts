let SpotifySDK: any = null; // Referencia al SDK de Spotify
let spotifyPlayer: any = null; // Referencia al reproductor

export const loadSpotifyScriptSDK: () => Promise<void> =
  async (): Promise<void> => {
    return new Promise((resolve, reject) => {
      const script: HTMLScriptElement = document.createElement("script");
      script.src = "https://sdk.scdn.co/spotify-player.js";
      script.async = true;

      script.onload = () => {
        resolve();
      };

      script.onerror = () => {
        reject(new Error("Error al cargar el SDK de Spotify."));
      };

      document.body.appendChild(script);
    });
  };

// **Revalidar el estado del SDK al navegar**
export const revalidateSpotifySDK = async (): Promise<void> => {
  if (!SpotifySDK && window.Spotify) {
    SpotifySDK = window.Spotify;
  }

  if (!SpotifySDK) {
    await loadSpotifyScriptSDK();
  } else {
    // console.log("Spotify SDK ya está listo.");
  }
};

export const initializeSpotifyPlayer = async (token: string): Promise<void> => {
  if (!SpotifySDK) {
    await revalidateSpotifySDK();
  }

  if (spotifyPlayer) {
    return;
  }

  spotifyPlayer = new SpotifySDK.Player({
    name: "My Web Player",
    getOAuthToken: (cb: any) => cb(token),
    volume: 0.5,
  });

  // Configurar eventos del reproductor
  spotifyPlayer.addListener("ready", ({ device_id }: any) => {
    console.log("Reproductor listo con ID del dispositivo:", device_id);
  });

  spotifyPlayer.addListener("not_ready", ({ device_id }: any) => {
    console.log("Reproductor no disponible. ID del dispositivo:", device_id);
  });

  spotifyPlayer.addListener("authentication_error", ({ message }: any) => {
    console.error("Error de autenticación:", message);
  });

  await spotifyPlayer.connect();

  // const success = await spotifyPlayer.connect();
  // if (success) {
  //   console.log("Spotify Player conectado exitosamente.");
  // } else {
  //   console.error("No se pudo conectar el Spotify Player.");
  // }
};

export const setupSpotifyPlayer: (token: string) => Promise<void> = async (
  token: string
) => {
  try {
    await initializeSpotifyPlayer(token);
  } catch (error) {
    console.log("Error al inicializar el Spotify Player:", error);
  }
};

// events
window.onSpotifyWebPlaybackSDKReady = () => {
  SpotifySDK = window.Spotify;
};
