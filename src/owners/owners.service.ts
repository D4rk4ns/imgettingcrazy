import { Injectable } from '@nestjs/common';
import { CreateOwnerInput } from './dto/create-owner.input';
import { UpdateOwnerInput } from './dto/update-owner.input';
import { Owner } from './entities/owner.entity';
import { Repository } from 'typeorm/repository/Repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OwnersService {

  constructor(@InjectRepository(Owner) private ownersRepository: Repository<Owner>){}

  async create(createOwnerInput: CreateOwnerInput): Promise<Owner> {
    const newOwner = this.ownersRepository.create(createOwnerInput);
    return this.ownersRepository.save(newOwner);
  }

  async findAll(): Promise<Owner[]> {
    return this.ownersRepository.find();
  }

  async findOne(id: number): Promise<Owner> {
    return this.ownersRepository.findOneOrFail({where:{id}});
  }

  async findByEmail(email: string): Promise<Owner> {
    return this.ownersRepository.findOneOrFail({where:{email}});
  }

  async update(id: number, updateOwnerInput: UpdateOwnerInput): Promise<Owner> {
    await this.ownersRepository.update(id, updateOwnerInput);
    return this.ownersRepository.findOne({where: {id}});    
  }


  async remove(id: number): Promise<Owner> {
    const deletedUser = await this.ownersRepository.findOne({where: {id}});
    this.ownersRepository.remove(deletedUser);
    return deletedUser;
  }
}
