import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Inventory } from './inventory.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/user.entity';
import { Category } from 'src/category/category.entity';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory/casl-ability.factory';
import type { UUID } from 'crypto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { UserPayload } from 'src/auth/auth.user-payload';
import { Messages } from 'src/constants/messages';
import { Action } from 'src/casl/casl.action';

const object = 'Inventory';
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

  async update(
    id: number,
    updateInventoryDto: UpdateInventoryDto,
    user: UserPayload | undefined = undefined,
  ) {
    const inventory = await this.findOne(id);
    if (!inventory) {
      throw new HttpException(
        Messages.notFound(object, id),
        HttpStatus.BAD_REQUEST,
      );
    }
    if (inventory.version !== updateInventoryDto.version) {
      throw new HttpException(Messages.WRONG_VERSION, HttpStatus.CONFLICT);
    }
    if (user) {
      const ability = this.caslAbilityFactory.createForUser(user);
      if (ability.cannot(Action.Update, inventory)) {
        throw new ForbiddenException(Messages.FORBIDDEN);
      }
    }

    const { editAccess, category, ...partialUpdateInventory } =
      updateInventoryDto;

    const updatedInventory: Inventory = {
      ...inventory,
      ...partialUpdateInventory,
    };

    if (editAccess) {
      updatedInventory.editAccess = editAccess.map((id) => ({ id }) as User);
    }

    if (category) {
      updatedInventory.category = { id: category } as Category;
    }

    try {
      const result = await this.inventoriesRepository.save(updatedInventory);
      return result;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: number): Promise<Inventory | null> {
    const inventory = await this.inventoriesRepository.findOne({
      where: { id },
    });
    return inventory;
  }

  remove(id: number) {
    return this.inventoriesRepository.delete(id);
  }
}
