export class CreateNotificationDto {
  senderId: string;

  type: string;

  content: string;

  receiverId: string;

  options: object;
}
