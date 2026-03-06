import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { randomUUID } from 'node:crypto';
import type { UUID } from 'node:crypto';
import type { DeleteResult } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: UUID): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const insertResult = await this.usersRepository.insert(createUserDto);
    return { ...createUserDto, ...insertResult.raw[0] };
  }

  remove(id: UUID): Promise<DeleteResult> {
    return this.usersRepository.delete(id);
  }
}
