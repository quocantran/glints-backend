import { IsNotEmpty } from "class-validator";

export class CreateSkillDto {
    @IsNotEmpty({ message: 'Name is required' })
    name: string;
}
