import { InputType, Field, Int } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

@InputType()
export class CreateOwnerInput {

  @Field()
  @IsNotEmpty()
  name: string;

  @Field({ nullable: true })
  lastname?: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(16)
  password: string;
}
