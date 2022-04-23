import { Injectable } from '@nestjs/common';
import { mkdir, getfolio,getpack, delDir, getFiles, unlink } from '../_utils/file';
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
    
    getFilesNote(type): any {
        if (type == 'note') {
            return getFiles(`${FilesPath.__noteFiles}`).map((file) => {
                return `http://${ServerPath.ip}:${ServerPath.host}/files/noteFiles/${file}`
            }).filter(httpFile => httpFile.indexOf('.DS_Store') === -1 )
        }else {
            return []
        }
    }

    // 个人文件系统

    // 添加文件夹
    setPortfolio({uid,superior}) : Promise<any> | any {
        mkdir(`${FilesPath.__packages}/${superior}`)
        return `http://${ServerPath.ip}:${ServerPath.host}/files/packages/${superior}`
    }
    // 获取文件夹
    getPortfolio({uid, superior}): any {
        return getfolio(`${FilesPath.__packages}/${superior}`).map(dir => `http://${ServerPath.ip}:${ServerPath.host}/files/packages/${superior}/${dir}`)
    }
    // 删除文件夹
    delPortfolio({uid, superior}): any {
        delDir(`${FilesPath.__packages}/${superior}`)
    }

    // 添加文件
    setPackages(files, {uid, superior}) : Promise<any> | any {
        console.log(uid, superior);
        files.map((file) => {
            createWriteStream(`${FilesPath.__packages}/${superior}/${file.originalname}`).write(file.buffer);
        })
        return files.map(ev => (`http://${ServerPath.ip}:${ServerPath.host}/files/packages/${superior}/${ev.originalname}`))
    }
    getPackages({uid, superior}): any {
        console.log(uid, superior);
        return getpack(`${FilesPath.__packages}/${superior}`).map(file => `http://${ServerPath.ip}:${ServerPath.host}/files/packages/${superior}/${file}`)
    }
    delPackages({uid, superior}): any {
        unlink(`${FilesPath.__packages}/${superior}`)
    }
}
