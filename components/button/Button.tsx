import { ButtonComponent } from "./Button.styled";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  fontSize?: "big" | "medium" | "small";
  buttonSize?: "big" | "medium" | "small";
  backgroudColor?: "primary" | "white" | "leave";
  disabled?: boolean;
  children?: React.ReactNode;
}

const Button = ({
  fontSize = "medium",
  buttonSize = "medium",
  backgroudColor = "primary",
  children,
  disabled = false,
  ...props
}: ButtonProps) => {
  return (
    <ButtonComponent
      $fontSize={fontSize}
      className={`button-${fontSize}`}
      $buttonSize={buttonSize}
      $backgroundColor={backgroudColor}
      disabled={disabled}
      {...props}
    >
      {children}
    </ButtonComponent>
  );
};

export default Button;
