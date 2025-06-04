import { PartialType } from '@nestjs/mapped-types';
import { CreateSubscriptionPlanDto } from './create-subscription.dto';

export class UpdateSubscriptionDto extends PartialType(
  CreateSubscriptionPlanDto,
) {}
