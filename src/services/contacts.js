import { contactsModel } from '../db/models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

export const getAllContacts = async ({
  userId,
  page,
  perPage,
  sortOrder = SORT_ORDER.ASC,
  sortBy = 'name',
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = contactsModel.find({ userId });
  const contactsCount = await contactsModel
    .find({ userId })
    .merge(contactsQuery)
    .countDocuments();

  const contacts = await contactsQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();
  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactById = async (contactId, userId) => {
  const contact = await contactsModel.findById({ _id: contactId, userId });
  return contact;
};

export const createContact = async (payload) => {
  return await contactsModel.create(payload);
};

export const updateContact = async (id, userId, payload, options = {}) => {
  const rawResult = await contactsModel.findByIdAndUpdate(
    { _id: id, userId },
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

export const deleteContactById = async (contactId, userId) => {
  const contact = await contactsModel.findOneAndDelete({
    _id: contactId,
    userId,
  });

  return contact;
};
