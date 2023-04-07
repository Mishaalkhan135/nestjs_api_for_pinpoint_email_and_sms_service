import { Controller, Post, Body } from '@nestjs/common';
import { SmsService } from './sms.service';

@Controller('sms')
export class SmsController {
  constructor(private readonly smsService: SmsService) {}

  @Post()
  async sendSms(
    @Body('phoneNumber') phoneNumber: string,
    @Body('message') message: string,
  ) {
    const result = await this.smsService.sendSms(phoneNumber, message);
    return { success: result };
  }
}
