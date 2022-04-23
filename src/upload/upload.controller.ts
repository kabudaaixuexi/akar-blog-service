import { Body, Controller, Get, Post, Render, Response, HttpException, HttpStatus, UseInterceptors,UploadedFiles } from '@nestjs/common';
import { FileInterceptor,FilesInterceptor,AnyFilesInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { VerifiEmptyField } from '../_utils/index'
@Controller('upload')
export class UploadController {
    @Post('setFilesNote')
    @UseInterceptors(AnyFilesInterceptor())
    async uploadFilesNote(@UploadedFiles() files, @Body() body){
        return {
            statusCode: 200,
            data: await new UploadService().setFilesNote(files, 'note')
        }
    }
    
    @Post('getFilesNote')
    async getFiles (@Body() body):Promise<any> {
        return {
            statusCode: 200,
            data: await new UploadService().getFilesNote('note')
        }
    }

    // 个人文件系统

    @Post('setPortfolio') // 添加文件夹
    @VerifiEmptyField(['uid', 'superior'])
    async setPortfolio(@Body() body){
        return {
            statusCode: 200,
            data: await new UploadService().setPortfolio(body)
        }
    }

    @Post('getPortfolio') // 获取文件夹
    @VerifiEmptyField(['uid', 'superior'])
    async getPortfolio (@Body() body):Promise<any> {
        return {
            statusCode: 200,
            data: await new UploadService().getPortfolio(body)
        }
    }

    @Post('delPortfolio') // 删除文件夹
    @VerifiEmptyField(['uid', 'superior'])
    async delPortfolio (@Body() body):Promise<any> {
        return {
            statusCode: 200,
            data: await new UploadService().delPortfolio(body)
        }
    }

    @Post('setPackages') // 添加文件
    @UseInterceptors(AnyFilesInterceptor())
    async setPackages(@UploadedFiles() files, @Body() body){
        return {
            statusCode: 200,
            data: await new UploadService().setPackages(files, body)
        }
    }

    

    @Post('getPackages') // 获取文件
    @VerifiEmptyField(['uid', 'superior'])
    async getPackages (@Body() body):Promise<any> {
        return {
            statusCode: 200,
            data: await new UploadService().getPackages(body)
        }
    }

    @Post('delPackages') // 删除文件
    @VerifiEmptyField(['uid', 'superior'])
    async delPackage (@Body() body):Promise<any> {
        return {
            statusCode: 200,
            data: await new UploadService().delPackages(body)
        }
    }
}
