export const epgDateFormatter = (date: Date) => {
  const monthNum = date.getMonth() + 1;
  const dayNum = date.getDate();
  const month = monthNum < 10 ? `0${monthNum}` : monthNum;
  const day = dayNum < 10 ? `0${dayNum}` : dayNum;
  return `${date.getFullYear()}-${month}-${day}`;
};
