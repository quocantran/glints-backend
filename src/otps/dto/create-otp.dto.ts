import { IsNotEmpty } from "class-validator";

export class CreateOtpDto {
    @IsNotEmpty({ message: 'Email is required' })
    email: string;
}
