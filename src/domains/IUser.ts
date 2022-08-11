export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
}

export type IUserToInsert = Omit<IUser, 'id'>;
