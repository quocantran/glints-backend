import { IsNotEmpty } from "class-validator";

export class CreateSubscriberDto {
    @IsNotEmpty({ message: 'Email is required' })
    email: string;

    @IsNotEmpty({ message: 'Skills are required' })
    skills: string[];
}
