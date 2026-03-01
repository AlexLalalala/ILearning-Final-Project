import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { randomUUID } from 'node:crypto';
import type {UUID} from 'node:crypto';
import type { DeleteResult } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ){}

  findAll(): Promise<User[]>{
    return this.usersRepository.find()
  }

  findOne(id: UUID): Promise<User | null>{
    return this.usersRepository.findOneBy({id})
  }

  async create(createUserDto: CreateUserDto): Promise<User | null>{
    const newUser: Omit<User, 'status' | 'is_admin'| 'registered_at'> = {id: randomUUID(), ...createUserDto}
    try{
      const insertResult = await this.usersRepository.insert(newUser)
      return {...createUserDto, ...insertResult.raw[0]}
    }catch(error){
      if (error instanceof QueryFailedError && error.message.includes('duplicate key')){
        throw new HttpException('Provided e-mail already registered', HttpStatus.BAD_REQUEST)
      }else{
        throw new HttpException(`Internal error: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR)
      }
    }
  }

  remove(id: UUID): Promise<DeleteResult>{
    return this.usersRepository.delete(id)
  }
}
