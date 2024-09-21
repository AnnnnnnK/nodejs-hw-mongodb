import { contactsModel } from '../db/models/contact.js';

export const getAllContacts = async () => {
  const contacts = await contactsModel.find();
  return contacts;
};

export const getContactById = async (contactId) => {
  const contact = await contactsModel.findById(contactId);
  return contact;
};

export const createContact = async (payload) => {
  return await contactsModel.create(payload);
};

export const updateContact = async (id, payload, options = {}) => {
  const rawResult = await contactsModel.findByIdAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    contact: rawResult.value,
    isNew: !rawResult.lastErrorObject.updatedExisting,
  };
};

export const deleteContactById = async (id) => {
  const contact = await contactsModel.findOneAndDelete({
    _id: id,
  });

  return contact;
};
