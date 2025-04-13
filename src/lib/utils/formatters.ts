
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

export const formatDate = (date: Date | string): string => {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatAccountNumber = (accountNumber: string): string => {
  // Show only the last 4 digits
  const last4 = accountNumber.slice(-4);
  return `••••••${last4}`;
};

export const shortenName = (name: string, maxLength = 20): string => {
  if (name.length <= maxLength) return name;
  return `${name.substring(0, maxLength - 3)}...`;
};
