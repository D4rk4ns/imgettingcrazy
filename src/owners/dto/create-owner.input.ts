import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateOwnerInput {

  @Field()
  name: string;

  @Field({ nullable: true })
  lastname?: string;

  @Field()
  email: string;

  @Field()
  password: string;
}
