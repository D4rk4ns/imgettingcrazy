import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Owner } from 'src/owners/entities/owner.entity';
import { OwnersService } from 'src/owners/owners.service';
import { Repository } from 'typeorm/repository/Repository';
import { CreatePetInput } from './dto/create-pet.input';
import { UpdatePetInput } from './dto/update-pet.input';
import { Pet } from './entities/pet.entity';

@Injectable()
export class PetsService {
  constructor(@InjectRepository(Pet) private petsRepository: Repository<Pet>,
    private ownersService: OwnersService){}
  
  async create(createPetInput: CreatePetInput): Promise<Pet> {
    const newPet = this.petsRepository.create(createPetInput);

    await this.petsRepository.save(newPet); //Save the new Pet

    const pownerId = await this.petsRepository.findOne({where: {name: newPet.name}}); 

    if(pownerId){
      console.log(pownerId.ownerId);
      const tempOwner = await this.ownersService.findOne(pownerId.ownerId);
      tempOwner.pets.push(newPet);
    }

    return newPet; //insert
  }

  async findAll(): Promise<Pet[]> {
    return this.petsRepository.find(); //Select * pet
  }

  async findOne(id: number): Promise<Pet> {
    return this.petsRepository.findOneOrFail({where: {id}});
  }

  async getOwner(ownerId: number): Promise<Owner> {
    return this.ownersService.findOne(ownerId);
  }

  async update(id: number, updatePetInput: UpdatePetInput): Promise<Pet> {
    await this.petsRepository.update(id, updatePetInput);
    return this.petsRepository.findOne({where: {id}});    
    
  }

  async remove(id: number): Promise<Pet> {
    const deletedPet = await this.petsRepository.findOne({where: {id}});
    this.petsRepository.remove(deletedPet);
    return deletedPet;
  }
}
