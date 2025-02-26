import nodemailer from "nodemailer";
import { sendEmailTemplate } from "@/styles/email/sendEmailTemplate";
import { DfGenerateVerificationCodeUseCase } from "./DfGenerateVerifyCodeUsecase";
import { ISendEmailUseCase } from "./interfaces/ISendEmailUsecase";
import { IVerificationRepository } from "@/domain/repositories/IVerificationRepository";

export class SendEmailUseCase implements ISendEmailUseCase {
  private transporter;
  constructor(
    private generateVerificationCodeUseCase: DfGenerateVerificationCodeUseCase,
    private verificationRepository: IVerificationRepository
  ) {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async execute(email: string): Promise<void> {
    if (!email) throw new Error("이메일을 입력해야 합니다.");

    const verificationCode = this.generateVerificationCodeUseCase.execute();
    console.log(`🔹 생성된 인증 코드: ${verificationCode}`);

    await this.verificationRepository.saveVerificationCode(
      email,
      verificationCode,
      300
    );

    const emailHtml = sendEmailTemplate(verificationCode);
    const mailOptions = {
      from: `"Fungle Company" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Fungle 이메일 인증 코드",
      html: emailHtml,
    };
    await this.transporter.sendMail(mailOptions);
  }
}
