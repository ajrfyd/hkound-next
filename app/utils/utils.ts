export const transformDateHandler = (date: string) =>
  new Intl.DateTimeFormat("ko-KR", {
    dateStyle: "medium",
  }).format(new Date(date));
