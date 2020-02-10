export const epgDateFormatter = (date: Date) => {
  const month = date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth();
  const day = date.getDay() < 10 ? `0${date.getDay()}` : date.getDay(); 
  return `${date.getFullYear()}-${month}-${day}`;
}
