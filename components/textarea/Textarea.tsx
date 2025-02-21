import { TextareaComponent } from "./Textarea.styled";

interface TextareaProps {
  placeholder: string;
  width?: string;
  height?: string;
}

const Textarea = ({ placeholder, width, height }: TextareaProps) => {
  return (
    <TextareaComponent
      placeholder={placeholder}
      width={width}
      height={height}
    />
  );
};

export default Textarea;
