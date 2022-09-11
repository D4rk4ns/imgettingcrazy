import { CreateOwnerInput } from './create-owner.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateOwnerInput extends PartialType(CreateOwnerInput) {

  @Field()
  name: string;
}
