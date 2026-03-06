import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryController } from './inventory/inventory.controller';
import { ItemController } from './item/item.controller';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';
import dotenv from 'dotenv';
import { UserService } from './user/user.service';
import { CategoryModule } from './category/category.module';
import { Category } from './category/category.entity';
import { InventoryModule } from './inventory/inventory.module';
import { Inventory } from './inventory/inventory.entity';
dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User, Category, Inventory],
      synchronize: true,
    }),
    UserModule,
    CategoryModule,
    InventoryModule,
  ],
  controllers: [AppController, ItemController],
  providers: [AppService],
})
export class AppModule {}
