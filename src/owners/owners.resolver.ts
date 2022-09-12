import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { OwnersService } from './owners.service';
import { Owner } from './entities/owner.entity';
import { CreateOwnerInput } from './dto/create-owner.input';
import { UpdateOwnerInput } from './dto/update-owner.input';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => Owner)
export class OwnersResolver {
  constructor(private readonly ownersService: OwnersService) {}

  @Mutation(() => Owner)
  createOwner(@Args('createOwnerInput') createOwnerInput: CreateOwnerInput): Promise<Owner> {
    return this.ownersService.create(createOwnerInput);
  }

  @Query(() => [Owner], { name: 'owners' })
  @UseGuards(GqlAuthGuard)
  findAll(): Promise<Owner[]> {
    return this.ownersService.findAll();
  }

  @Query(() => Owner, { name: 'owner' })
  @UseGuards(GqlAuthGuard)
  findOne(@Args('id', { type: () => Int }) id: number): Promise<Owner> {
    return this.ownersService.findOne(id);
  }

  @Query(() => Owner, { name: 'owner' })
  findByEmail(@Args('email') email: string): Promise<Owner> {
    return this.ownersService.findByEmail(email);
  }

  
  @Mutation(() => Owner)
  @UseGuards(GqlAuthGuard)
  updateOwner(@Args('updateOwnerInput') updateOwnerInput: UpdateOwnerInput): Promise<Owner> {
    return this.ownersService.update(updateOwnerInput.id, updateOwnerInput);
  }

  @Mutation(() => Owner)
  @UseGuards(GqlAuthGuard)
  removeOwner(@Args('id', { type: () => Int }) id: number): Promise<Owner> {
    return this.ownersService.remove(id);
  }
}
