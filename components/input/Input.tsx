import { Container, InputComponent, Label } from "./Input.styled";

interface InputProps {
  label?: string;
  placeholder?: string;
  src?: string;
}

const Input = ({ label, placeholder = "입력", src }: InputProps) => {
  return (
    <Container>
      {label && <Label>{label}</Label>}
      <InputComponent placeholder={placeholder} src={src} />
    </Container>
  );
};

export default Input;
