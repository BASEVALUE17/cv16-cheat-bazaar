
// Conversion rate from USD to INR (example rate, may need to be updated)
const USD_TO_INR_RATE = 83.5;

export const convertToINR = (usdPrice: number): number => {
  return usdPrice * USD_TO_INR_RATE;
};

export const formatINR = (inrPrice: number): string => {
  return `₹${inrPrice.toFixed(2)}`;
};
