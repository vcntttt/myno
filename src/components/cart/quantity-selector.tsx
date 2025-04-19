import { Minus, Plus } from "lucide-react";
import { Button } from "../ui/button";

interface Props {
  quantity: number;
  onDecrement: () => void;
  onIncrement: () => void;
}

export const QuantitySelector = ({
  quantity,
  onDecrement,
  onIncrement,
}: Props) => {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={onDecrement}
      >
        <Minus className="h-4 w-4" />
      </Button>
      <span className="w-8 text-center">{quantity}</span>
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={onIncrement}
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
};
