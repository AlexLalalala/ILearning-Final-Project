import { Controller, Get, Post, Delete, Param, Body, ValidationPipe } from '@nestjs/common';
import { CreateInventoryDto } from './dto/create-inventory.dto';

@Controller('inventory')
export class InventoryController {

  @Get()
  findAll(){
    return {message: `All inventories are returned`}
  }

  @Get(':id')
  findOne(@Param('id') id: string){
    return {message: `Inventory with id:${id} is returned`}
  }

  @Post()
  create(@Body(new ValidationPipe) createPostDto: CreateInventoryDto){
    return {message: `Inventory with ${JSON.stringify(createPostDto)} is created`}
  }

  @Delete(':id')
  remove(@Param('id') id:string){
    return {message: `Inventory with id:${id} is deleted`}
  }
}
