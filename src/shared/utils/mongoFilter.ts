import { QuerySelector } from 'mongoose';

interface IFilterQuery {
  [key: string]: QuerySelector<any>;
}

export const transformFilterToMongoFilterQuery = (filter: unknown) => {
  const filterQuery: IFilterQuery = {};
  if (typeof filter === 'object') {
    for (const prop in filter) {
      let field = prop.split('_')[0];
      const operator = prop.split('_')[1];
      if (!field || !operator) continue;

      if (field === 'id') {
        field = '_id';
      }

      const value = filter[prop];
      switch (operator.toString()) {
        case 'equal':
          filterQuery[field] = { $eq: value };
          break;

        case 'notEqual':
          filterQuery[field] = { $ne: value };
          break;

        case 'in':
          filterQuery[field] = { $in: [...value] };
          break;

        case 'notIn':
          filterQuery[field] = { $nin: [...value] };
          break;

        case 'greaterThan':
          filterQuery[field] = { $gt: value };
          break;

        case 'greaterThanOrEqual':
          filterQuery[field] = { $gte: value };
          break;

        case 'lessThan':
          filterQuery[field] = { $lt: value };
          break;

        case 'lessThanOrEqual':
          filterQuery[field] = { $lte: value };
          break;

        case 'contains':
          filterQuery[field] = { $regex: value?.toString(), $options: 'i' };

        default:
          break;
      }
    }
  }
  return filterQuery;
};
