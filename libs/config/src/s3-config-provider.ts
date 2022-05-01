import { Injectable } from '@nestjs/common';
import * as S3 from 'aws-sdk/clients/s3';

const ENV = process.env;
@Injectable()
export class S3ConfigProvider {
  private readonly s3: S3;

  private readonly bucketName: string;

  constructor() {
    this.bucketName = ENV.AWS_S3_BUCKET_NAME;
    this.s3 = new S3({
      accessKeyId: ENV.AWS_ACCESS_KEY_ID,
      secretAccessKey: ENV.AWS_SECRET_ACCESS_KEY,
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
