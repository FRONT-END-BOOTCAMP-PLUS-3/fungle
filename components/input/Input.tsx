import { Container, InputComponent, Label } from "./Input.styled";

interface InputProps {
  label?: string;
  placeholder?: string;
  src?: string;
  size?: string;
}

const Input = ({
  label,
  placeholder = "입력",
  src,
  size = "big",
}: InputProps) => {
  return (
    <Container>
      {label && <Label>{label}</Label>}
      <InputComponent placeholder={placeholder} src={src} $size={size} />
    </Container>
  );
};

export default Input;
