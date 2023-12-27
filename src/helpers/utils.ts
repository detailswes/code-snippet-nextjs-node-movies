export const getTotal = (cart: Object[]): string => {
  return formatPrice(calculateTotal(cart));
};

export const calculateTotal = (cart: Object[]) => {
  if (cart.length > 0) {
    const total = cart.reduce(
      (acc: number, curr: any) => acc + curr.updatedPrice,
      0
    );
    return total;
  }
  return 0;
};
export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2,
    style: "currency",
    currency: "USD",
  }).format(price);
};

export const shippingAmount = (cart: Object[]) => {
  const shipping = (calculateTotal(cart) * 10) / 100;
  return formatPrice(shipping);
};

export const finalPrice = (cart: Object[]) => {
  const total = calculateTotal(cart);
  return formatPrice(total + (total * 10) / 100);
};
