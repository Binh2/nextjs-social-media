export function formatDate(date: string | Date) {
  const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString('en-US', options);
}

// Format date to be relative to now
export function formatDateShort(date: string | Date): string {
  date = new Date(date);
  const now = new Date();
  if (now.getFullYear() > date.getFullYear()) return (now.getFullYear() - date.getFullYear()).toString() + 'y';
  else if (now.getMonth() > date.getMonth()) return (now.getMonth() - date.getMonth()).toString() + 'm';
  else if (now.getDate() > date.getDate()) return (now.getDate() - date.getDate()).toString() + 'd';
  else if (now.getHours() > date.getHours()) return (now.getHours() - date.getHours()).toString() + 'h';
  else if (now.getMinutes() > date.getMinutes()) return (now.getMinutes() - date.getMinutes()).toString() + 'min';
  else if (now.getSeconds() >= date.getSeconds()) return (now.getSeconds() - date.getSeconds()).toString() + 's';
  return '';
}