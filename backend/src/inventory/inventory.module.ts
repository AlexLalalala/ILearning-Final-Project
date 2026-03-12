import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inventory } from './inventory.entity';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { UserModule } from 'src/user/user.module';
import { CaslModule } from 'src/casl/casl.module';

@Module({
  imports: [TypeOrmModule.forFeature([Inventory]), UserModule, CaslModule],
  providers: [InventoryService],
  controllers: [InventoryController],
})
export class InventoryModule {}
