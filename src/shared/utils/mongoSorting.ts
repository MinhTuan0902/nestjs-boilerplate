import { SortOrder } from 'mongoose';

export const transformSortingOption = (
  sortingInput: string,
): { [key: string]: SortOrder } => {
  const sort = {};
  const [fieldToSort, sortType] = sortingInput.split('_');
  sort[fieldToSort] = sortType === 'ASC' ? 1 : -1;
  return sort;
};
