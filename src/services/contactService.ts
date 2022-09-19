import StatusCodes from 'http-status-codes';
import { IContact, IContactToInsert } from '../domains/IContact';
import { ISuccess } from '../domains/ISuccess';
import CustomError from '../middlewares/CustomError';
import logger from '../misc/Logger';
import ContactsModel from '../models/contactsModel';

export const createContact = async (
  contactToInsert: IContactToInsert
): Promise<ISuccess<IContact>> => {
  logger.info('creating contact');
  const contact = await ContactsModel.createContact(contactToInsert);
  logger.info('created contact successfully');
  return {
    data: contact,
    message: 'contact created successfully',
  };
};
export const getAllContactsByUserId = async (
  userId: number
): Promise<ISuccess<IContact[]>> => {
  logger.info('getting all contacts by userId');

  const contacts = await ContactsModel.getAllContactsByUserId(userId);
  if (!contacts.length) {
    throw new CustomError("Contacts  doesn't exists", StatusCodes.NOT_FOUND);
  }
  logger.info('got contacts by userId successfully');
  return {
    data: contacts,
    message: 'contact by userId fetched successfully',
  };
};

export const updateContact = async (
  contact: IContact
): Promise<ISuccess<IContact>> => {
  logger.info('updating contact by userId from token data and id');
  const updatedContact = await ContactsModel.updateContact(contact);
  if (!updatedContact) {
    throw new CustomError(
      "Contacts  doesn't exists to edit",
      StatusCodes.NOT_FOUND
    );
  }
  logger.info('updated contacts by userId and id successfully');
  return {
    data: updatedContact,
    message: 'updated contact by userId and id successfully',
  };
};

export const deleteContact = async (
  userId: number,
  id: number
): Promise<ISuccess<IContact>> => {
  logger.info('updating contact by userId from token data and id');
  const contact = await ContactsModel.deleteContact(userId, id);
  if (!contact) {
    throw new CustomError(
      'Couldnot delete the requested contact',
      StatusCodes.NOT_FOUND
    );
  }
  logger.info('deleted contacts by userId and id successfully');
  return {
    data: contact,
    message: 'deleted contact by userId and id successfully',
  };
};
