import { Module } from '@nestjs/common';
import { ExcessController } from './excess.controller';
import { ExcessService } from './excess.service';

@Module({
    controllers: [ExcessController],
    providers: [ExcessService]
})
export class ExcessModule {}
