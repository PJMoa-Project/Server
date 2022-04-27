import { UseGuards } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';

export const Throttler = () => UseGuards(ThrottlerGuard);
