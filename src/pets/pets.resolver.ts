import { Resolver, Query, Mutation, Args, Int, Parent, ResolveField } from '@nestjs/graphql';
import { PetsService } from './pets.service';
import { Pet } from './entities/pet.entity';
import { CreatePetInput } from './dto/create-pet.input';
import { UpdatePetInput } from './dto/update-pet.input';
import { Owner } from 'src/owners/entities/owner.entity';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => Pet)
export class PetsResolver {
  constructor(private readonly petsService: PetsService) {}

  @Mutation(() => Pet)
  @UseGuards(GqlAuthGuard)
  createPet(@Args('createPetInput') createPetInput: CreatePetInput): Promise<Pet> {
    return this.petsService.create(createPetInput);
  }

  @Query(() => [Pet], { name: 'pets' })
  @UseGuards(GqlAuthGuard)
  findAll(): Promise<Pet[]> {
    return this.petsService.findAll();
  }

  @Query(() => Pet, { name: 'pet' })
  @UseGuards(GqlAuthGuard)
  findOne(@Args('id', { type: () => Int }) id: number): Promise<Pet> {
    return this.petsService.findOne(id);
  }

  @ResolveField(() => Owner)
  @UseGuards(GqlAuthGuard)
  owner(@Parent() pet:Pet): Promise<Owner>{
    return this.petsService.getOwner(pet.ownerId);
  }

  /*
  @Mutation(() => Pet)
  updatePet(@Args('updatePetInput') updatePetInput: UpdatePetInput): Promise<Pet> {
    return this.petsService.update(updatePetInput.id, updatePetInput);
  }

  @Mutation(() => Pet)
  removePet(@Args('id', { type: () => Int }) id: number): Promise<boolean> {
    return this.petsService.remove(id);
  }
  */
}
