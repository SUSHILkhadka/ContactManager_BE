import db from '../db/db';
import { IContact, IContactToInsert } from '../domains/IContact';

class Contact {
  private static table = 'contacts';

  public static async createContact(contactToInsert: IContactToInsert): Promise<IContact[]> {
    const contact = await db(this.table).insert(contactToInsert).returning('*');
    return contact;
  }

  public static async getAllContactsByUserId(userId: number): Promise<IContact[]> {
    const contacts = await db(this.table).where('userId', userId).returning('*');
    return contacts;
  }

  public static async updateContact(contact: IContact): Promise<IContact[]> {
    const updatedContact = await db(this.table)
      .where({ userId: contact.userId, id: contact.id })
      .update(contact)
      .returning('*');
    console.log('updateUser = ', updatedContact);
    return updatedContact;
  }
  public static async deleteContact(userId: number, id: number): Promise<IContact[]> {
    const _deletedContact = await db(this.table).where({ userId: userId, id: id }).del().returning('*');
    console.log(_deletedContact);
    const remainingContacts = await db(this.table).select();
    return remainingContacts;
  }

  public static async getContactByUserIdAndPhoneNumber(userId: number, phoneNumber: number): Promise<IContact> {
    const contact = await db(this.table).where({ userId: userId, phoneNumber: phoneNumber }).returning('*').first();
    return contact;
  }
}
export default Contact;
