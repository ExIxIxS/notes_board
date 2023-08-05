function getNoteDateString(dateObj) {
  const date = (dateObj instanceof Date) ? dateObj : new Date();

  const hours = date.getHours();
  const minutes = getTwoCharsWithZero(date.getMinutes());
  const days = getTwoCharsWithZero(date.getDate());
  const mounth = getTwoCharsWithZero(date.getMonth());
  const year = date.getFullYear();

  return `${hours}:${minutes} ${days}.${mounth}.${year}`
}

function getTwoCharsWithZero(val) {
  const str = String(val);

  return (str.length === 2)
    ? str
    : `0${str}`;
}

export {
  getNoteDateString,
}
