import { IsNotEmpty } from 'class-validator';

export class ApproveApplicationsParamRequestDto {
  @IsNotEmpty()
  readonly projectId: number;

  @IsNotEmpty()
  readonly applicationId: number;
}
