import { applyDecorators } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponseOptions,
  ApiBodyOptions,
  ApiBody,
} from '@nestjs/swagger';

interface IApiDocument {
  summary?: string;
  description?: string;
  deprecated?: boolean;
  okRes?: ApiResponseOptions;
  createdRes?: ApiResponseOptions;
  bodyOptions?: ApiBodyOptions;
}

export const ApiDoc = ({
  summary,
  description,
  deprecated,
  okRes = {},
  createdRes,
  bodyOptions = {},
}: IApiDocument) =>
  applyDecorators(
    ApiOperation({ summary, description, deprecated }),
    ApiOkResponse(okRes),
    ApiCreatedResponse(createdRes),
    ApiBody(bodyOptions),
  );
