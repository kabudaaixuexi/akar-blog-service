import { Injectable } from '@nestjs/common';
import { fileBySuffix, appendFile, readFile, getFiles } from '../_utils/file';
import { FilesPath, ServerPath } from '../_config'
import { createWriteStream } from 'fs';

@Injectable()
export class UploadService {
    setFilesNote(files, type) : Promise<any> | any {
        if (type == 'note') {
            files.map((file) => {
                createWriteStream(`${FilesPath.__noteFiles}/${file.originalname}`).write(file.buffer);
            })
            return files.map(ev => (`http://${ServerPath.ip}:${ServerPath.host}/files/noteFiles/${ev.originalname}`))
        }else {
            return '上传成功'
        }
    }

    setPackages(files, type) : Promise<any> | any {
        files.map((file) => {
            createWriteStream(`${FilesPath.__packages}/${file.originalname}`).write(file.buffer);
        })
        return files.map(ev => (`http://${ServerPath.ip}:${ServerPath.host}/files/packages/${ev.originalname}`))
    }

    getFilesNote(type): any {
        if (type == 'note') {
            return getFiles(`${FilesPath.__noteFiles}`).map((file) => {
                return `http://${ServerPath.ip}:${ServerPath.host}/files/noteFiles/${file}`
            }).filter(httpFile => httpFile.indexOf('.DS_Store') === -1 )
        }else {
            return []
        }
    }
}
