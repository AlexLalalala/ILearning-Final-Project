import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  ValidationPipe,
  HttpException,
  HttpStatus,
  ParseIntPipe,
  UseGuards,
  Req,
  ForbiddenException,
  Patch,
} from '@nestjs/common';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { InventoryService } from './inventory.service';
import { QueryFailedError, Repository } from 'typeorm';
import type { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import type { UUID } from 'crypto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory/casl-ability.factory';
import { Action } from 'src/casl/casl.action';
import { Inventory } from './inventory.entity';
import { UserPayload } from 'src/auth/auth.user-payload';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { Messages } from 'src/constants/messages';

const object = 'Inventory';

@Controller('inventory')
export class InventoryController {
  constructor(
    private inventoriesService: InventoryService,
    private usersService: UserService,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  @Get()
  findAll() {
    try {
      return this.inventoriesService.findAll();
    } catch (error) {
      throw new HttpException(
        Messages.GENERAL_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const response = await this.inventoriesService.findOne(id);
    if (response) {
      return response;
    } else {
      throw new HttpException(
        Messages.notFound(object, id),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body(new ValidationPipe()) createInventoryDto: CreateInventoryDto,
    @Req() req,
  ) {
    return this.inventoriesService.create(createInventoryDto, req.user.userId);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe()) updateInventoryDto: UpdateInventoryDto,
    @Req() { user }: { user: UserPayload },
  ) {
    const inventory = await this.inventoriesService.findOne(id);
    if (!inventory) {
      throw new HttpException(
        Messages.notFound(object, id),
        HttpStatus.BAD_REQUEST,
      );
    }
    const ability = this.caslAbilityFactory.createForUser(user);
    if (ability.cannot(Action.Update, inventory)) {
      throw new ForbiddenException(Messages.FORBIDDEN);
    }

    const result = this.inventoriesService.update(id, updateInventoryDto);
    return result;
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: number, @Req() req) {
    const inventory = await this.inventoriesService.findOne(id);
    if (!inventory)
      throw new HttpException(
        Messages.notFound(object, id),
        HttpStatus.BAD_REQUEST,
      );

    const user: UserPayload = req.user;
    const ability = this.caslAbilityFactory.createForUser(user);
    if (ability.cannot(Action.Delete, inventory)) {
      throw new ForbiddenException(Messages.FORBIDDEN);
    }

    const result = await this.inventoriesService.remove(id);
    return result;
  }
}
