import { Types, isValidObjectId } from 'mongoose';

export const makeObjectId = (id?: string): Types.ObjectId => {
  return new Types.ObjectId(isValidObjectId(id) ? id : undefined);
};
