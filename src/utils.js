const parseDateString = (dateStr) => {
  const date = new Date(dateStr);

  const year = date.getFullYear();
  const month = date.toLocaleDateString(`en-US`, {month: `long`});

  return {year, month};
};

export {parseDateString};
