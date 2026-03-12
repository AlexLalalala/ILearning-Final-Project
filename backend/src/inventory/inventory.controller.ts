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
        'Something went wrong',
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
        `Inventory with id: ${id} can not be found`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body(new ValidationPipe()) createPostDto: CreateInventoryDto,
    @Req() req,
  ) {
    return this.inventoriesService.create(createPostDto, req.user.userId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: number, @Req() req) {
    const inventory = await this.inventoriesService.findOne(id);
    if (!inventory)
      throw new HttpException(
        `Inventory with id: ${id} can not be found`,
        HttpStatus.BAD_REQUEST,
      );

    const user: UserPayload = req.user;
    const ability = this.caslAbilityFactory.createForUser(user);
    if (ability.cannot(Action.Delete, inventory)) {
      throw new ForbiddenException(
        'You do NOT have permission to do this action',
      );
    }

    const result = await this.inventoriesService.remove(id);
    return result;
  }
}
