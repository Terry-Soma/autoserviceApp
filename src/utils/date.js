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
      if (date < 7) {
        // last month
        let tempDate = date + 30;
        return `${year}/${month}/${tempDate - 7} - ${year}/${month + 1}/${date}`;
      }
      return `${year}/${month + 1}/${date - 7} -${year}/${month + 1}/${date}`;
    case "last3":
      if (date < 3) {
        // last month
        let tempDate = date + 30;
        return `${year}/${month}/${tempDate - 3} - ${year}/${month + 1}/${date}`;
      }
      return `${year}/${month + 1}/${date - 3} -${year}/${month + 1}/${date}`;
    case "lastmonth":
      if (month < 1) {
        // 0  -> 1 sar
        let tempMonth = month + 12;
        return `${year}/${tempMonth}/${date} - ${year}/${month + 1}/${date}`;

      }
      return `${year}/${month}/${date} - ${year}/${month + 1}/${date}`;

    case "last3month":
      if (date < 90) {
        // last month
        let tempDate = date + 30;
        return `${year}/${month}/${tempDate - 30} - ${year}/${month + 1}/${date}`;
      }
      return `${year}/${month + 1}/${date - 7} -${year}/${month + 1}/${date}`;
      return;
    default: return formattedToday();
  }


}