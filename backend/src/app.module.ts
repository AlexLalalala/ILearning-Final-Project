import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryController } from './inventory/inventory.controller';
import { ItemController } from './item/item.controller';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';
import dotenv from 'dotenv'
import { UserService } from './user/user.service';
dotenv.config()



@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User],
      synchronize: true,
    }),
    UserModule
  ],
  controllers: [AppController, InventoryController, ItemController],
  providers: [AppService],
})
export class AppModule {}
