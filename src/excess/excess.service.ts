import { Injectable } from '@nestjs/common';

@Injectable()
export class ExcessService {
    async getWalkCharts(state): Promise<any> {
        return [
            {
                uri: '',
                link: '',
                type: '',
                expl: ''
            }
        ]
    }
}
