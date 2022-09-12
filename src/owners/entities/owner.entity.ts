import { ObjectType, Field, Int } from '@nestjs/graphql';
import { IsAlpha, IsEmail } from 'class-validator';
import { Pet } from 'src/pets/entities/pet.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Owner {

  @PrimaryGeneratedColumn()
  @Field(type => Int)
  id: number;

  @Column()
  @IsAlpha()
  @Field()
  name: string;

  @Column({ nullable: true })
  @IsAlpha()
  @Field({ nullable: true })
  lastname?: string;

  @Column()
  @Field()
  @IsAlpha()
  @IsEmail()
  email: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  password?: string;

  @OneToMany(() => Pet, pet => pet.owner)
  @Field(type => [Pet], { nullable: true })
  pets?: Pet[];
}
