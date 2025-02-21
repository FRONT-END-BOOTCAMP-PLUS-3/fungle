import { ButtonComponent } from "./Button.styled";

interface ButtonProps {
  fontSize?: "big" | "medium" | "small";
  buttonSize?: "big" | "medium" | "small";
  backgroudColor?: "primary" | "white" | "leave";
  disabled?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}

const Button = ({
  fontSize = "medium",
  buttonSize = "medium",
  backgroudColor = "primary",
  children,
  disabled = false,
  onClick,
}: ButtonProps) => {
  return (
    <ButtonComponent
      $fontSize={fontSize}
      className={`button-${fontSize}`}
      $buttonSize={buttonSize}
      $backgroundColor={backgroudColor}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </ButtonComponent>
  );
};

export default Button;
