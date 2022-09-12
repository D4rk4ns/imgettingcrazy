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

  //Let's see how to fix this
  /*
  async update(id: number, updateOwnerInput: UpdateOwnerInput): Promise<Owner> {
    return await this.ownersRepository.update(id, ...updateOwnerInput);
  }
*/

  async remove(id: number) {
    const deletedUser = await this.ownersRepository.findOne({where: {id}});
    return this.ownersRepository.remove(deletedUser);
  }
}
