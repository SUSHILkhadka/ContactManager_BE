export interface IContact {
  id: number;
  name: string;
  email: string;
  workNumber: string;
  homeNumber: string;
  phoneNumber: number;
  photograph: string;
  favourite: boolean;
  userId: number;
}

export type IContactToInsert = Omit<IContact, "id">;
