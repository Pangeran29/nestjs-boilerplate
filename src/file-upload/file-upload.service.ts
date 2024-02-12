import { FileSystemService } from '@app/helper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FileUploadService {
  constructor(private readonly fileSystemService: FileSystemService) { }

  async saveFile(file: Express.Multer.File) {
    const { originalname, buffer } = file;
    return await this.fileSystemService.saveFile(originalname, buffer);
  }
}
