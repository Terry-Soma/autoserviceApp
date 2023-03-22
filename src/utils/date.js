export function formattedDate(sell_date = null) {

  let date = sell_date ? new Date(sell_date) : new Date()

  return `${formattedToday(date)}| ${date.getHours()}:${date.getMinutes()}м`;

}
export function formattedToday(givenDate = null) {
  let date = givenDate ? new Date(givenDate) : new Date()
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
}
export function formatQueryToDate(query) {
  // today last3 last7 lastmonth last3month
  let originalDate = new Date();
  let year = originalDate.getFullYear();
  let month = originalDate.getMonth();
  let date = originalDate.getDate()
  switch (query) {
    case "last7":
      const last = originalDate.getDate() - 7;
      break;
      return `${originalDate.getFullYear()}/${originalDate.getMonth() + 1}/${date.getDate()}`;
    case "last3":
      return `${year}/${month + 1}/${date}`;
      break;
    case "lastmonth":
      break;
    case "last3month":
      break;
    default: formattedToday();
      break;
  }

  return ``;
}