import mongoose from 'mongoose';
export declare class CreateRoleDto {
    name: string;
    description: string;
    isActive: boolean;
    permissions: mongoose.Schema.Types.ObjectId[];
}
