import { Label, TextareaComponent } from "./Textarea.styled";

interface TextareaProps {
  placeholder?: string;
  width?: string;
  height?: string;
  defaultValue?: string;
  ariaLabel: string;
}

const Textarea = ({
  placeholder,
  width,
  height = "60vh",
  defaultValue,
  ariaLabel,
}: TextareaProps) => {
  return (
    <>
      <Label />
      <TextareaComponent
        placeholder={placeholder}
        width={width}
        height={height}
        defaultValue={defaultValue}
        aria-label={ariaLabel}
      />
    </>
  );
};

export default Textarea;
