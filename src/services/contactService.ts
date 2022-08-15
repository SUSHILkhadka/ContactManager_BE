import StatusCodes from 'http-status-codes';
import { ISuccess } from '../domains/ISuccess';
import ContactsModel from '../models/contactsModel';
import logger from '../misc/Logger';
import CustomError from '../middlewares/CustomError';
import { IContact, IContactToInsert } from '../domains/IContact';

export const createContact = async (contactToInsert: IContactToInsert): Promise<ISuccess<IContact>> => {

  logger.info('creating contact  =>contactService.createcontact');
  const contact = await ContactsModel.createContact(contactToInsert);
  logger.info('created contact successfully =>contactService.createcontact');
  return {
    data: contact,
    message: 'contact created successfully',
  };
};
export const getAllContactsByUserId = async (userId: number): Promise<ISuccess<IContact[]>> => {
  logger.info('getting all contacts by userId =>contactService.getAllContactsByUserId');

  const contacts = await ContactsModel.getAllContactsByUserId(userId);
  console.log(contacts);
  if (!contacts.length) {
    throw new CustomError("Contacts  doesn't exists", StatusCodes.NOT_FOUND);
  }
  logger.info('got contacts by userId successfully =>contactService.getAllContactsByUserId');
  return {
    data: contacts,
    message: 'contact by userId fetched successfully',
  };
};

export const updateContact = async (contact: IContact): Promise<ISuccess<IContact[]>> => {
  logger.info('updating contact by userId from token data and id =>contactService.updateContact');
  const contacts = await ContactsModel.updateContact(contact);
  if (!contacts.length) {
    throw new CustomError("Contacts  doesn't exists to edit", StatusCodes.NOT_FOUND);
  }
  logger.info('updated contacts by userId and id successfully =>contactService.updateContact');
  return {
    data: contacts,
    message: 'updated contact by userId and id successfully',
  };
};

export const deleteContact = async (userId: number, id: number): Promise<ISuccess<IContact>> => {
  logger.info('updating contact by userId from token data and id =>contactService.updateContact');
  const contact = await ContactsModel.deleteContact(userId, id);
  if (!contact) {
    throw new CustomError('Couldnot delte the requested contact', StatusCodes.NOT_FOUND);
  }
  logger.info('deleted contacts by userId and id successfully =>contactService.updateContact');
  return {
    data: contact,
    message: 'deleted contact by userId and id successfully',
  };
};

