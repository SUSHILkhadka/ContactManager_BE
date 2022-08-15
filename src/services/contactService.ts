import StatusCodes from 'http-status-codes';
import { ISuccess } from '../domains/ISuccess';
import ContactsModel from '../models/contactsModel';
import logger from '../misc/Logger';
import CustomError from '../middlewares/CustomError';
import { IContact, IContactToInsert } from '../domains/IContact';
import cloudinary from '../config/cloudinary';

export const createContact = async (contactToInsert: IContactToInsert): Promise<ISuccess<IContact>> => {
  const phoneNumberAlreadyExists = await ContactsModel.getContactByUserIdAndPhoneNumber(
    contactToInsert.userId,
    contactToInsert.phoneNumber
  );
  if (phoneNumberAlreadyExists) {
    throw new CustomError('contact with phone number already exists', StatusCodes.BAD_REQUEST);
  }

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
  // if (!contacts.length) {
  //   throw new CustomError("Remaining Contacts  doesn't exists", StatusCodes.NOT_FOUND);
  // }
  if (!contact) {
    throw new CustomError('Couldnot delte the requested contact', StatusCodes.NOT_FOUND);
  }
  logger.info('deleted contacts by userId and id successfully =>contactService.updateContact');
  return {
    data: contact,
    message: 'deleted contact by userId and id successfully',
  };
};

export const updateContactPhotoOnly = async (contact: IContact): Promise<ISuccess<IContact[]>> => {
  logger.info('updating photo by userId from token data and id =>contactService.updateContactPhotoOnly');
  const { photograph } = contact;
  try {
    logger.info('uploading image to cloudinary');
    const uploadResponse = await cloudinary.uploader.upload(photograph, {
      upload_preset: 'contacts-photo',
    });
    logger.info('successfully uploaded image to cloudinary');
    contact.photograph = uploadResponse.url;

    const contacts = await ContactsModel.updateContact(contact);
    if (!contacts.length) {
      throw new CustomError("Contacts  doesn't exists to edit", StatusCodes.NOT_FOUND);
    }
    logger.info('updated contacts by userId and id successfully =>contactService.updateContactPhotoOnly');
    return {
      data: contacts,
      message: 'updated contact by userId and id successfully',
    };
  } catch (e) {
    throw new CustomError(`${e}`, StatusCodes.INTERNAL_SERVER_ERROR);
  }
};
