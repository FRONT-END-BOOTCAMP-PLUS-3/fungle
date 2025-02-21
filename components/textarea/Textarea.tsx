import { TextareaComponent } from "./Textarea.styled";

interface TextareaProps {
  placeholder?: string;
  width?: string;
  height?: string;
  defaultValue?: string;
}

const Textarea = ({
  placeholder,
  width,
  height = "60vh",
  defaultValue,
}: TextareaProps) => {
  return (
    <TextareaComponent
      placeholder={placeholder}
      width={width}
      height={height}
      defaultValue={defaultValue}
    />
  );
};

export default Textarea;
