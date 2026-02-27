import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Inventory } from './inventory/inventory';
import { InventoryService } from './inventory/inventory.service';
import { InventoryModule } from './inventory/inventory.module';

@Module({
  imports: [InventoryModule],
  controllers: [AppController],
  providers: [AppService, Inventory, InventoryService],
})
export class AppModule {}
