declare global {
  interface Window {
    onSpotifyWebPlaybackSDKReady: () => void;

    Spotify: {
      Player: new (options: Spotify.PlayerInit) => Spotify.Player;
    };
  }
}

namespace Spotify {
  export interface PlayerInit {
    name: string;
    getOAuthToken: (cb: (token: string) => void) => void;
    volume?: number;
  }

  export interface Player {
    connect(): Promise<boolean>;
    disconnect(): void;
    addListener(event: PlayerEvent, callback: (data: any) => void): void;
    removeListener(event: PlayerEvent): void;
  }

  export type PlayerEvent =
    | "ready"
    | "not_ready"
    | "player_state_changed"
    | "initialization_error"
    | "authentication_error";
}

export {};
