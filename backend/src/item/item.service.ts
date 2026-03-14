import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './item.entity';
import { Repository } from 'typeorm';
import { UserPayload } from 'src/auth/auth.user-payload';
import { User } from 'src/user/user.entity';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private itemsRepository: Repository<Item>,
  ) {}

  async create(createItemDto: CreateItemDto, user: UserPayload): Promise<Item> {
    const insertResult = await this.itemsRepository.insert({
      ...createItemDto,
      createdBy: { id: user.userId } as User,
    });
    return { ...createItemDto, ...insertResult.raw[0] };
  }

  findAll(): Promise<Item[]> {
    return this.itemsRepository.find();
  }

  findOne(id: number) {
    return this.itemsRepository.findOneBy({ id });
  }

  update(id: number, updateItemDto: UpdateItemDto) {
    return this.itemsRepository.update(id, updateItemDto);
  }

  remove(id: number) {
    return this.itemsRepository.delete(id);
  }
}
