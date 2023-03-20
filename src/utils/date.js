export function formattedDate(sell_date) {
  let date = new Date(sell_date)
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} | ${date.getHours()}:${date.getMinutes()}м`;

}