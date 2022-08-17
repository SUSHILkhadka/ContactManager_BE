export interface ITokens<T> {
  data?: T | T[];
  accessToken?: string;
  refreshToken?: string;
  expiresAt?: string;
  expiresAtRefreshToken?: number;
  message: string;
}

export type ITokensAfterLogout = Omit<ITokens<any>, 'accessToken'>;
