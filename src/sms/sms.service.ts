import { Injectable } from '@nestjs/common';
import { PinpointClient, SendMessagesCommand } from '@aws-sdk/client-pinpoint';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class SmsService {
  private readonly pinpointClient: PinpointClient;

  constructor() {
    this.pinpointClient = new PinpointClient({ region: 'us-east-1' });
  }

  async sendSms(phoneNumber: string, message: string): Promise<boolean> {
    //================================================================
    // Add your Pinpoint Application ID
    //================================================================
    const ApplicationId = 'Dummy';
    const pinpointParams = {
      ApplicationId,
      MessageRequest: {
        Addresses: {
          [phoneNumber]: {
            ChannelType: 'SMS',
          },
        },
        MessageConfiguration: {
          SMSMessage: {
            Body: message,
            MessageType: 'TRANSACTIONAL',
          },
        },
        TraceId: uuidv4(),
      },
    };

    try {
      await this.pinpointClient.send(new SendMessagesCommand(pinpointParams));
      return true;
    } catch (error) {
      console.error('Error sending SMS:', error);
      return false;
    }
  }
}
