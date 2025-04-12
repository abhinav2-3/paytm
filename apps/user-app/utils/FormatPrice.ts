export function formatPrice(amount: number) {
  const newAmount = amount / 100;
  const formattedNumber = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(newAmount);
  return formattedNumber;
}
