/// <reference types="multer" />
export declare class FilesService {
    uploadFile(file: Express.Multer.File): Promise<{
        url: String;
    }>;
}
