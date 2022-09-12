import { CreateOwnerInput } from './create-owner.input';
import { InputType, Field, PartialType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateOwnerInput extends PartialType(CreateOwnerInput) {

  @Field(type => Int)
  id:number;

  @Field()
  name: string;

  @Field({ nullable: true })
  lastname?: string;

  @Field()
  email: string;

}
