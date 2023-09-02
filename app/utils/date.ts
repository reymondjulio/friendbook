export function formatDate(dateString: string): string {
  const date = new Date(dateString);

  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
}

// const inputDate = "2023-08-21T07:28:50.273Z";
// const formattedDate = formatDate(inputDate);
// console.log(formattedDate);
