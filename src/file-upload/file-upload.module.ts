import { FileSystemModule } from '@app/helper';
import { Module } from '@nestjs/common';
import { FileUploadController } from './file-upload.controller';
import { FileUploadService } from './file-upload.service';

@Module({
  controllers: [FileUploadController],
  providers: [FileUploadService],
  imports: [FileSystemModule],
})
export class FileUploadModule { }
