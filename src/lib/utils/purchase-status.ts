export const getStatusVariant = (status: string) => {
  switch (status.toLowerCase()) {
    case "delivered":
      return "default";
    case "processing":
      return "secondary";
    case "cancelled":
      return "destructive";
    default:
      return "outline";
  }
};

export const getStatusLabel = (status: string) => {
  switch (status.toLowerCase()) {
    case "delivered":
      return "Completado";
    case "processing":
      return "En proceso";
    case "cancelled":
      return "Cancelado";
    default:
      return status;
  }
};
