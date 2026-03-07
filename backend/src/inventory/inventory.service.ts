import { Injectable } from '@nestjs/common';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Inventory } from './inventory.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/user.entity';
import { Category } from 'src/category/category.entity';
// import { UpdateInventoryDto } from './dto/update-inventory.dto';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Inventory)
    private inventoriesRepository: Repository<Inventory>,
  ) {}

  async create(
    createInventoryDto: CreateInventoryDto,
    user: User | undefined = undefined,
  ) {
    const insertResult = await this.inventoriesRepository.insert({
      ...createInventoryDto,
      created_by: user,
      category: { id: createInventoryDto.category } as Category,
    });
    return { ...createInventoryDto, ...insertResult.raw[0] };
  }

  findAll(): Promise<Inventory[]> {
    return this.inventoriesRepository.find();
  }

  async findOne(id: number): Promise<Inventory | null> {
    const inventory = await this.inventoriesRepository.findOneBy({ id });
    return inventory;
  }

  // update(id: number, updateInventoryDto: UpdateInventoryDto) {
  //   return `This action updates a #id inventory`;
  // }

  remove(id: number) {
    return this.inventoriesRepository.delete(id);
  }
}
