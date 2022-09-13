import { Controller, Post, Body } from '@nestjs/common';
import { ExcessService } from './excess.service';

@Controller('excess')
export class ExcessController {
    @Post('getWalkCharts')
    async getWalkCharts(@Body() body):Promise<any> {
        return {
            statusCode: 200,
            data: await new ExcessService().getWalkCharts(body)
        }
    }
}
