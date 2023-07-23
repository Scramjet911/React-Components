import { Minus, WhiteTickIcon } from "assets/icons";
import { ButtonOnClickEvent } from "./types";

interface CheckboxProps {
  className?: string;
  isChecked?: boolean;
  isIndeterminate?: boolean;
  onClick?: ButtonOnClickEvent;
}

const Checkbox: React.FC<CheckboxProps> = ({
  className = "",
  isChecked = false,
  isIndeterminate = false,
  onClick = () => null,
}) => {
  return (
    <button
      className={`w-4 h-4 mr-2 flex border overflow-hidden items-center justify-center ${
        isChecked || isIndeterminate ? "bg-blue-500" : ""
      } ${className}`}
      onClick={onClick}
    >
      {isChecked ? (
        <WhiteTickIcon />
      ) : (
        isIndeterminate && <Minus className="w-2.5" />
      )}
    </button>
  );
};

export default Checkbox;
