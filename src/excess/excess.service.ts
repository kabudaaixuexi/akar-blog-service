import { Injectable } from '@nestjs/common';
import { getFiles } from '../_utils/file';
import { FilesPath, ServerPath } from '../_config'
@Injectable()
export class ExcessService {
    async getWalkCharts(state): Promise<any> {
        return getFiles(`${FilesPath.__rotations}`).map((file) => {
            return {
                uri: `http://${ServerPath.ip}:${ServerPath.host}/files/rotations/${file}`,
                type: 0,
                expl: file.name,
                link: `http://${ServerPath.ip}:${ServerPath.host}/files/rotations/${file}`
            }
        })
    }
}
