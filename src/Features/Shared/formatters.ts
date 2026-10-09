export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatNumber(value: number) {
  return value.toLocaleString("en-US");
}

export function formatChange(value: number) {
  return `+${value}%`;
}