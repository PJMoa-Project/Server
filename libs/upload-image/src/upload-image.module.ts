import { Module } from '@nestjs/common';
import { UploadImageService } from './upload-image.service';

@Module({
  providers: [UploadImageService],
  exports: [UploadImageService],
})
export class UploadImageModule {}
