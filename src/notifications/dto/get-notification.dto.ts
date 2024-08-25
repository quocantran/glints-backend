import { IsNotEmpty, IsNumber } from 'class-validator';

export class GetNotificationDto {
  @IsNotEmpty()
  current: number;

  @IsNotEmpty()
  pageSize: number;
}
