/**
 * Format price in Indian Rupees (₹)
 * @param price - Price in USD (will be converted to INR at 83:1 rate)
 * @returns Formatted string with ₹ symbol
 */
export const formatPrice = (price: number): string => {
  // Convert USD to INR (approximate rate: 1 USD = 83 INR)
  const priceInINR = price * 83;
  
  // Format with Indian number system (lakhs, crores)
  return `₹${priceInINR.toLocaleString('en-IN', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;
};

/**
 * Get raw INR price from USD
 * @param price - Price in USD
 * @returns Price in INR
 */
export const getINRPrice = (price: number): number => {
  return price * 83;
};
