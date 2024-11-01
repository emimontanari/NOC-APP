import nodemailer from "nodemailer";
import { envs } from "../../config/plugins/envs.plugin";

export class EmailService {
  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.
    }
  });
}
