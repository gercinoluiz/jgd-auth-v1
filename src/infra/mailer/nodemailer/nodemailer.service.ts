import { Injectable } from '@nestjs/common'
import { MailerService } from '@nestjs-modules/mailer'

@Injectable()
export class YourService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(
    to: string,
    subject: string,
    template: string,
    context: never,
  ) {
    await this.mailerService.sendMail({
      to,
      subject,
      template, // Nome do template no diretório 'templates'
      context, // Dados que serão passados para o template
    })
  }

  async sendWelcomeEmail(username: string, email: string, code: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Bem-vindo ao nosso site!',
      template: 'welcome', // Corresponde ao nome do arquivo 'welcome.hbs' (sem a extensão)
      context: {
        username,
        code,
      },
    })
  }
}
