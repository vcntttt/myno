export function formatPrice(price: number) {
  return price.toLocaleString("es-ES", {
    style: "currency",
    currency: "CLP",
  });
}
