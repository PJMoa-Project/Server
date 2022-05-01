import { Injectable, Logger } from '@nestjs/common';
import { S3 } from 'aws-sdk';

import { S3ConfigProvider } from '@app/config/s3-config-provider';
import { RandomId } from '@app/utils/random-id';

interface IS3Params {
  Bucket: string;
  Key: string;
  Body: Buffer;
}

@Injectable()
export class UploadImageService {
  private readonly s3Provider: S3ConfigProvider;

  constructor() {
    this.s3Provider = new S3ConfigProvider();
  }

  public async uploadImage(file: Express.Multer.File) {
    const { originalname, buffer } = file;
    const s3Bucket = this.s3Provider.getBucketName();

    const result = await this.uploadS3(
      buffer,
      s3Bucket,
      RandomId.generateRandomId(originalname),
    );
    return result;
  }

  private async uploadS3(file: Buffer, bucket: string, name: string) {
    const s3 = this.s3Provider.getS3();
    const s3Params: IS3Params = {
      Bucket: bucket,
      Key: name,
      Body: file,
    };

    const result = await this.uploadImageToS3(s3, s3Params);
    return result;
  }

  private uploadImageToS3(
    s3: S3,
    s3Params: IS3Params,
  ): Promise<S3.ManagedUpload.SendData> {
    return new Promise((resolve, reject) => {
      s3.upload(s3Params, (err, data) => {
        if (err) {
          Logger.error(err);
          reject(err);
        }
        resolve(data);
      });
    });
  }
}
