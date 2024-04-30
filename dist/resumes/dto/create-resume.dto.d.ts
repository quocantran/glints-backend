import mongoose from 'mongoose';
export declare class CreateResumeDto {
    url: string;
    companyId: mongoose.Schema.Types.ObjectId;
    jobId: mongoose.Schema.Types.ObjectId;
}
