import { Injectable } from '@nestjs/common';
import { PinpointClient, SendMessagesCommand } from '@aws-sdk/client-pinpoint';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class EmailService {
  private readonly pinpointClient: PinpointClient;

  constructor() {
    //================================================================
    // Add your AWS region
    //================================================================
    this.pinpointClient = new PinpointClient({ region: 'us-east-1' });
  }

  async sendEmail(to: string, subject: string, body: string): Promise<boolean> {
    //================================================================
    // Add your Pinpoint Application ID
    //================================================================
    const ApplicationId = 'Dummy';
    const pinpointParams = {
      ApplicationId,
      MessageRequest: {
        Addresses: {
          [to]: {
            ChannelType: 'EMAIL',
          },
        },
        MessageConfiguration: {
          EmailMessage: {
            SimpleEmail: {
              Subject: {
                Charset: 'UTF-8',
                Data: subject,
              },
              HtmlPart: {
                Charset: 'UTF-8',
                Data: body,
              },
            },
          },
        },
        TraceId: uuidv4(),
      },
    };

    try {
      await this.pinpointClient.send(new SendMessagesCommand(pinpointParams));
      return true;
    } catch (error) {
      console.error('Error sending email:', error);
      return false;
    }
  }
}
