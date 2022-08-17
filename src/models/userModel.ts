import db from '../db/db';
import { IUser, IUserToInsert } from '../domains/IUser';

class User {
  private static table = 'user_account';

  public static async createUser(userToInsert: IUserToInsert): Promise<IUser[]> {
    // try {
    const user = await db(this.table).insert(userToInsert).returning('*');
    return user;
    // } catch (err) {
    //   throw new Error(`${err}`);
    // }

    //no need of try catch, db itself throws error which is catched by
    //errorHnadler middleware due to matching parameter before req,res,next.
  }

  public static async getUserByEmail(email: string): Promise<IUser> {
    const user = await db(this.table).where('email', email).returning('*').first();
    return user;
  }

  public static async getAllUsers(): Promise<IUser[]> {
    const users = await db(this.table).select().returning('*');
    return users;
  }

  public static async updateUser(user: IUser): Promise<IUser[]> {
    const updatedUser = await db(this.table).where('id', user.id).update(user).returning('*');
    return updatedUser;
  }
  public static async deleteUser(id: number): Promise<IUser> {
    const deletedUser = await db(this.table).where('id', id).del().returning("*");
    return deletedUser[0];
  }
}
export default User;
