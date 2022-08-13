import db from '../db/db';
import IRefreshToken from '../domains/IRefreshToken';

class RefreshTokenModel {
  public static table = 'refresh_token';
  public static async getAllRefreshTokens(): Promise<IRefreshToken[]> {
    const refreshTokens = await db(this.table).select().returning('*');
    return refreshTokens;
  }

  public static async getRefreshTokenByToken(refreshToken: string): Promise<IRefreshToken> {
    const refreshTokenDataFromDb = await db(this.table).where('refreshToken', refreshToken).returning('*').first();
    return refreshTokenDataFromDb;
  }

  public static async createRefreshToken(refreshTokenForDb: IRefreshToken): Promise<IRefreshToken[]> {
    const addedRefreshToken = await db(this.table).insert(refreshTokenForDb).returning('*');
    return addedRefreshToken;
  }

  public static async deleteRefreshTokenByToken(refreshToken: string): Promise<IRefreshToken[]> {
    const deletedRefreshToken = await db(this.table).where('refreshToken', refreshToken).del().returning('*');
    const remainingRefreshToken = await db(this.table).select();
    console.log('after deletion', deletedRefreshToken);
    return remainingRefreshToken;
  }
}

export default RefreshTokenModel;
