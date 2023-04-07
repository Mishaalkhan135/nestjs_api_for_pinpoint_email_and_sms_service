import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailController } from './email/email.controller';
import { EmailService } from './email/email.service';
import { SmsService } from './sms/sms.service';
import { SmsController } from './sms/sms.controller';

@Module({
  imports: [],
  controllers: [AppController, EmailController, SmsController],
  providers: [AppService, EmailService, SmsService, SmsController],
})
export class AppModule {}
