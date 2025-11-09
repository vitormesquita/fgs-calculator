export function getMonths() {
  const months: { name: string, value: number }[] = [];
  const dummyYear = new Date().getFullYear();

  for (let i = 0; i < 12; i++) {
    const date = new Date(dummyYear, i, 1);
    const monthName = Intl.DateTimeFormat('pt-BR', { month: 'long' }).format(date);
    months.push({name: monthName,value: i + 1});
  }

  return months;
}