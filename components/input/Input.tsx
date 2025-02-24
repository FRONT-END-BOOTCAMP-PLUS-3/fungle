import { Container, InputComponent, Label } from "./Input.styled";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  placeholder: string;
  src?: string;
  hideLabel?: boolean;
  iconPosition?: "left" | "right";
}

const Input = ({
  label,
  placeholder,
  src,
  hideLabel = false,
  iconPosition,
  ...props
}: InputProps) => {
  return (
    <Container>
      {label && <Label $srOnly={hideLabel}>{label}</Label>}
      <InputComponent
        placeholder={placeholder}
        src={src}
        aria-label={label}
        $iconPosition={iconPosition}
        {...props}
      />
    </Container>
  );
};

export default Input;
