import { Injectable } from '@nestjs/common';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Inventory } from './inventory.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/user.entity';
import { Category } from 'src/category/category.entity';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory/casl-ability.factory';
import type { UUID } from 'crypto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Inventory)
    private inventoriesRepository: Repository<Inventory>,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  async create(createInventoryDto: CreateInventoryDto, userId: UUID) {
    const insertResult = await this.inventoriesRepository.insert({
      ...createInventoryDto,
      createdBy: { id: userId } as User,
      category: { id: createInventoryDto.category } as Category,
    });
    return { ...createInventoryDto, ...insertResult.raw[0] };
  }

  findAll(): Promise<Inventory[]> {
    return this.inventoriesRepository.find();
  }

  update(id: number, updateInventoryDto: UpdateInventoryDto) {
    return this.inventoriesRepository.update(id, {
      ...updateInventoryDto,
      category: { id: updateInventoryDto.category } as Category,
    });
  }

  async findOne(id: number): Promise<Inventory | null> {
    const inventory = await this.inventoriesRepository.findOneBy({ id });
    return inventory;
  }

  remove(id: number) {
    return this.inventoriesRepository.delete(id);
  }
}
