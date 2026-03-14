import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import type { UUID } from 'node:crypto';
import type { DeleteResult } from 'typeorm';
import * as bcrypt from 'bcrypt';

type FindUserBy = { id: UUID } | { email: string };

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find({
      select: {
        email: true,
        name: true,
        id: true,
        status: true,
        isAdmin: true,
        registeredAt: true,
      },
    });
  }

  findOne(findBy: FindUserBy): Promise<User | null> {
    return this.usersRepository.findOne({
      where: findBy,
      select: {
        email: true,
        name: true,
        id: true,
        status: true,
        isAdmin: true,
        registeredAt: true,
      },
    });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(createUserDto.password, salt);
    const insertResult = await this.usersRepository.insert({
      salt,
      passwordHash,
      ...createUserDto,
    });
    return { ...createUserDto, ...insertResult.raw[0] };
  }

  remove(id: UUID): Promise<DeleteResult> {
    return this.usersRepository.delete(id);
  }
}
