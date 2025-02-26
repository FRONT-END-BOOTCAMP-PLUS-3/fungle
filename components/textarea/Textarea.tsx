import { Label, TextareaComponent } from "./Textarea.styled";

interface TextareaProps {
  placeholder?: string;
  width?: string;
  height?: string;
  defaultValue?: string;
  ariaLabel: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
}

const Textarea = ({
  placeholder,
  width,
  height = "60vh",
  defaultValue,
  ariaLabel,
  onChange,
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
        onChange={onChange}
      />
    </>
  );
};

export default Textarea;
