export const transformSortingOption = (sortingInput: string) => {
  const sort = {};
  const [fieldToSort, sortType] = sortingInput.split('_');
  sort[fieldToSort] = sortType === 'ASC' ? 1 : -1;
  return sort;
};
