import { Injectable } from '@nestjs/common';
import { CreatePetInput } from './dto/create-pet.input';
import { UpdatePetInput } from './dto/update-pet.input';
import { Pet } from './entities/pet.entity';

@Injectable()
export class PetsService {
  
  async create(createPetInput: CreatePetInput): Promise<Pet> {
    
  }

  async findAll(): Promise<Pet[]> {
    
  }

  async findOne(id: number): Promise<Pet> {

  }

  async update(id: number, updatePetInput: UpdatePetInput): Promise<Pet> {

  }

  async remove(id: number): Promise<boolean> {

  }
}
