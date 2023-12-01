/**
 *
 * @param property Default value is `_id` because it's default identify field name of MongoDB
 * @returns
 */
export const sortDataByIds = <T>(
  data: Array<T>,
  keys: Array<string>,
  property = '_id',
): Array<T> => {
  const mapData = {};
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    mapData[item[property].toString()] = item;
  }
  return keys.map((k) => {
    return mapData[k] as T;
  });
};

/**
 *
 * @param property Name of property that needs to be sorted by
 * @returns
 */
export const sortArrayData = <T>(
  data: Array<T>,
  keys: Array<string>,
  property: string,
): Array<Array<T>> => {
  const mapData = {};
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    if (mapData[item[property]]) {
      mapData[item[property]] = [...mapData[item[property]], item];
    } else {
      mapData[item[property]] = [item];
    }
  }

  return keys.map((k) => {
    return mapData[k] as Array<T>;
  });
};
