import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as S3 from 'aws-sdk/clients/s3';

@Injectable()
export class S3ConfigProvider {
  private readonly s3: S3;

  private readonly bucketName: string;

  constructor(private readonly configService: ConfigService) {
    this.bucketName = configService.get<string>('AWS_S3_BUCKET_NAME');
    this.s3 = new S3({
      accessKeyId: configService.get<string>('AWS_ACCESS_KEY_ID'),
      secretAccessKey: configService.get<string>('AWS_SECRET_ACCESS_KEY'),
      logger: console,
    });
  }

  public getS3() {
    return this.s3;
  }

  public getBucketName() {
    return this.bucketName;
  }
}
