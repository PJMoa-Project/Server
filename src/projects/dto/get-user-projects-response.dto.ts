export class GetUserProjects {
  readonly projectId: number;

  readonly projectTitle: string;

  readonly startDate: Date;

  readonly endDate: Date;

  readonly isProjectOwner: boolean;
}

export class GetUserProjectsResponseDto {
  readonly userProjects: GetUserProjects[] | null;

  constructor(partial: Partial<GetUserProjectsResponseDto>) {
    Object.assign(this, partial);
  }
}
