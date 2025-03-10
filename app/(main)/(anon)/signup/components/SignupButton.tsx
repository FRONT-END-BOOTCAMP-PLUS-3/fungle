import { ErrorMessage } from "../Signup.styled";
import Button from "@/components/button/Button";

interface SubmitButtonProps {
  isFormValid: boolean;
  serverError: string;
}

const SubmitButton = ({ isFormValid, serverError }: SubmitButtonProps) => {
  return (
    <>
      {serverError && <ErrorMessage>{serverError}</ErrorMessage>}
      <Button type="submit" disabled={!isFormValid} buttonSize="big">
        회원가입
      </Button>
    </>
  );
};

export default SubmitButton;
