export function discountPrice(price, discount) {
  return Number(price) - (parseFloat(price) * parseFloat(discount)) / 100;
}
