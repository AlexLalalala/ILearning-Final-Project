import { ItemModule } from './item/item.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import dotenv from 'dotenv';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Category } from './category/category.entity';
import { CategoryModule } from './category/category.module';
import { Inventory } from './inventory/inventory.entity';
import { InventoryModule } from './inventory/inventory.module';
import { ItemController } from './item/item.controller';
import { ItemService } from './item/item.service';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
import { Item } from './item/item.entity';
dotenv.config();

@Module({
  imports: [
    ItemModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User, Category, Inventory, Item],
      synchronize: true,
    }),
    UserModule,
    CategoryModule,
    InventoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
