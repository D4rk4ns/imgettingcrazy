import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateOwnerInput {

  @Field()
  name: string;

}
