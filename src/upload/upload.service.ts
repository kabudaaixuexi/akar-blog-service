import { Injectable } from '@nestjs/common';
import { mkdir, getfolio,getpack, delDir, getFiles, unlink, rename } from '../_utils/file';
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
        mkdir(`${FilesPath.__packages}/${uid}${superior ? `/${superior}` : '' }`)
        return `http://${ServerPath.ip}:${ServerPath.host}/files/packages/${uid}${superior ? `/${superior}` : '' }`
    }
    // 获取文件夹
    getPortfolio({uid, superior}): any {
        return getfolio(`${FilesPath.__packages}/${uid}${superior ? `${superior}` : '' }`).map(dir => `http://${ServerPath.ip}:${ServerPath.host}/files/packages/${uid}${superior ? `${superior}` : '' }/${dir}`)
    }
    // 删除文件夹
    delPortfolio({uid, superior}): any {
        delDir(`${FilesPath.__packages}/${uid}${superior ? `/${superior}` : '' }`)
    }
    // 文件夹重命名
    async renamePortfolio({uid, superior, name}):Promise<any> {
        const path = `${FilesPath.__packages}/${uid}${superior ? `/${superior}` : '' }`
        let tea = path.split('/')
        tea.splice(tea.length - 1, 1, name)
        const newPath = tea.join('/')
        await rename(path, newPath)
    }

    // 添加文件
    async setPackages(files, {uid, superior}) : Promise<any> {
        await mkdir(`${FilesPath.__packages}/${uid}${superior ? `/${superior}` : '' }`)
        files.map((file) => {
            createWriteStream(`${FilesPath.__packages}/${uid}${superior ? `/${superior}` : '' }/${file.originalname}`).write(file.buffer);
        })
        return files.map(ev => (`http://${ServerPath.ip}:${ServerPath.host}/files/packages/${uid}${superior ? `/${superior}` : '' }/${ev.originalname}`))
    }
    getPackages({uid, superior}): any {
        return getpack(`${FilesPath.__packages}/${uid}${superior ? `/${superior}` : '' }`).map(file => `http://${ServerPath.ip}:${ServerPath.host}/files/packages/${uid}${superior ? `/${superior}` : '' }/${file}`)
    }
    delPackages({uid, superior}): any {
        unlink(`${FilesPath.__packages}/${uid}${superior ? `/${superior}` : '' }`)
    }
    // 文件重命名与文件夹一样
    async renamePackage({uid, superior, name}):Promise<any> {
        const path = `${FilesPath.__packages}/${uid}${superior ? `/${superior}` : '' }`
        let tea = path.split('/')
        tea.splice(tea.length - 1, 1, name)
        const newPath = tea.join('/')
        await rename(path, newPath)
    }
}
