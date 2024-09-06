export function formatPrice(amount: number) {
  const formattedNumber = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount);
  return formattedNumber;
}
