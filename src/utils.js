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
  findDistance
};
