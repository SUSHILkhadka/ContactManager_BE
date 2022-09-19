import db from '../db/db';
import { IContact, IContactToInsert } from '../domains/IContact';

class Contact {
  private static table = 'contacts';

  public static async createContact(
    contactToInsert: IContactToInsert
  ): Promise<IContact> {
    const contact = await db(this.table).insert(contactToInsert).returning('*');
    return contact[0];
  }

  public static async getAllContactsByUserId(
    userId: number
  ): Promise<IContact[]> {
    const contacts = await db(this.table)
      .where('userId', userId)
      .returning('*');
    return contacts;
  }

  public static async updateContact(contact: IContact): Promise<IContact> {
    const updatedContact = await db(this.table)
      .where({ userId: contact.userId, id: contact.id })
      .update(contact)
      .returning('*');
    return updatedContact[0];
  }

  public static async deleteContact(
    userId: number,
    id: number
  ): Promise<IContact> {
    const _deletedContact = await db(this.table)
      .where({ userId, id })
      .del()
      .returning('*');
    return _deletedContact[0];
  }
}
export default Contact;
