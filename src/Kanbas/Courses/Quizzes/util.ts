export function formatDate(date: any) {
  if (date) {
    const newDate = new Date(date);
    return newDate.toDateString();
  }
  return "";
}
