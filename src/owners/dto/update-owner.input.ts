import { CreateOwnerInput } from './create-owner.input';
import { InputType, Field, PartialType, Int } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateOwnerInput extends PartialType(CreateOwnerInput) {

  @Field(type => Int)
  id:number;

  @Field()
  @IsNotEmpty()
  name: string;

  @Field({ nullable: true })
  lastname?: string;

  @Field()
  @IsNotEmpty()
  @IsEmail()
  email: string;

}
