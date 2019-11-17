const SNAKE_STYLE_DIVIDER = `_`;

const capitalizeStr = (str) => `${str[0].toUpperCase()}${str.slice(1)}`;

const transformSnakeToCamelCase = (str) => {
  const splitStr = str.split(SNAKE_STYLE_DIVIDER);

  return splitStr.slice(1).reduce((acc, cur) => acc + capitalizeStr(cur), splitStr[0]);
};

const isObject = (obj) => {
  return typeof obj === `object` && !Array.isArray(obj) && obj !== null;
};

const transformObjSnakeToCamel = (obj) => {
  return Object.keys(obj).reduce((acc, cur) => {
    const currentItem = obj[cur];

    if (isObject(currentItem)) {
      obj[cur] = transformObjSnakeToCamel(currentItem);
    }

    acc[transformSnakeToCamelCase(cur)] = obj[cur];

    return acc;
  }, {});
};

const getRandomNumber = (max, min = 0) => {
  return min + Math.floor(Math.random() * (max - min));
};

const parseDateString = (dateStr) => {
  const date = new Date(dateStr);

  const year = date.getFullYear();
  const month = date.toLocaleDateString(`en-US`, {month: `long`});

  return {year, month};
};

const findDistance = (coords1, coords2) => {
  return Math.sqrt(
      Math.pow(coords2.latitude - coords1.latitude, 2) +
      Math.pow(coords2.longitude - coords1.longitude, 2)
  );
};

export {
  parseDateString,
  findDistance,
  transformObjSnakeToCamel,
  getRandomNumber
};
