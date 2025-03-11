export type NicknameErrorType =
  | "MISSING_CREDENTIALS"
  | "DUPLICATE_NICKNAME"
  | "UNKNOWN_ERROR";

export class NicknameError extends Error {
  constructor(public type: NicknameErrorType, message: string) {
    super(message);
    this.name = "NicknameError";
  }
}
