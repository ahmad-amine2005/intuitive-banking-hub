
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  return passwordRegex.test(password);
};

export const validateAccountNumber = (accountNumber: string): boolean => {
  // Simple validation: 10-12 digits
  const accountRegex = /^\d{10,12}$/;
  return accountRegex.test(accountNumber);
};

export const validateAmount = (amount: string): boolean => {
  // Ensure it's a positive number with up to 2 decimal places
  const amountRegex = /^[0-9]+(\.[0-9]{1,2})?$/;
  return amountRegex.test(amount) && parseFloat(amount) > 0;
};
