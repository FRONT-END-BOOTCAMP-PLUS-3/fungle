import { TextareaComponent } from "./Textarea.styled";

interface TextareaProps {
  placeholder?: string;
  width?: string;
  height?: string;
  defaultValue?: string;
  ariaLabel: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  name?: string;
}

const Textarea = ({
  placeholder,
  width,
  height = "60vh",
  defaultValue,
  ariaLabel,
  onChange,
  name,
}: TextareaProps) => {
  return (
    <>
      <TextareaComponent
        placeholder={placeholder}
        width={width}
        height={height}
        defaultValue={defaultValue}
        aria-label={ariaLabel}
        onChange={onChange}
        name={name}
      />
    </>
  );
};

export default Textarea;
