import { Container, InputComponent, Label } from "./Input.styled";

interface InputProps {
  label?: string;
  placeholder?: string;
  src?: string;
  size?: string;
  hideLabel?: boolean;
}

const Input = ({
  label,
  placeholder = "입력",
  src,
  size = "big",
  hideLabel = false,
}: InputProps) => {
  return (
    <Container>
      {label && <Label $srOnly={hideLabel}>{label}</Label>}
      <InputComponent
        placeholder={placeholder}
        src={src}
        $size={size}
        aria-label={label}
      />
    </Container>
  );
};

export default Input;
