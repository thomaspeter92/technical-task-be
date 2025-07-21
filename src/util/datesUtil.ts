export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = date.getDate();

  const getOrdinal = (n: number): string => {
    if (n > 3 && n < 21) return "th";
    switch (n % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  return `${day}${getOrdinal(day)} ${month} ${year}`;
};
