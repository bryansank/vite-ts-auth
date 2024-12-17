export interface IResponseSpotifyToken {
  access_token: string;
  token_type: string;
  expires_in: string;
  refresh_token: string;
  scope: string;
}

export interface IErrorResponseSpotifyToken {
  error: string;
  error_description: string;
}
