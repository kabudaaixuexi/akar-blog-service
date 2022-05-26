import { Body, Controller, Query, Post, UseGuards, Request, HttpException, HttpStatus, UseInterceptors,UploadedFiles } from '@nestjs/common';
import { FileInterceptor,FilesInterceptor,AnyFilesInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { VerifiEmptyField } from '../_utils/index'
// jwt
import { AuthGuard } from '@nestjs/passport';
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

    // 用户文件系统
    @UseGuards( AuthGuard('jwt'))
    @Post('setPortfolio') // 添加文件夹
    async setPortfolio(@Request() token, @Query() query){
        if(!query.superior) {
            return {
                statusCode: 999,
                message: `文件夹类型不能为空`,
            }
        }
        return {
            statusCode: 200,
            data: await new UploadService().setPortfolio({
                uid: token.user.uid,
                superior: query.superior
            })
        }
    }

    @UseGuards( AuthGuard('jwt'))
    @Post('getPortfolio') // 获取文件夹
    async getPortfolio (@Request() token, @Query() query):Promise<any> {
        if(!query.superior) {
            return {
                statusCode: 999,
                message: `文件夹类型不能为空`,
            }
        }
        return {
            statusCode: 200,
            data: await new UploadService().getPortfolio({
                uid: token.user.uid,
                superior: query.superior
            })
        }
    }

    @UseGuards( AuthGuard('jwt'))
    @Post('delPortfolio') // 删除文件夹
    async delPortfolio (@Request() token, @Query() query):Promise<any> {
        if(!query.superior) {
            return {
                statusCode: 999,
                message: `文件夹类型不能为空`,
            }
        }
        return {
            statusCode: 200,
            data: await new UploadService().delPortfolio({
                uid: token.user.uid,
                superior: query.superior
            })
        }
    }

    @UseGuards( AuthGuard('jwt'))
    @Post('setPackages') // 添加文件
    @UseInterceptors(AnyFilesInterceptor())
    async setPackages(@UploadedFiles() files, @Request() token, @Query() query ){
        if(!query.superior) {
            return {
                statusCode: 999,
                message: `文件夹类型不能为空`,
            }
        }
        return {
            statusCode: 200,
            data: await new UploadService().setPackages(files, {
                uid: token.user.uid,
                superior: query.superior
            })
        }
    }

    
    @UseGuards( AuthGuard('jwt'))
    @Post('getPackages') // 获取文件
    async getPackages (@Query() query, @Request() token):Promise<any> {
        if(!query.superior) {
            return {
                statusCode: 999,
                message: `文件夹类型不能为空`,
            }
        }
        return {
            statusCode: 200,
            data: await new UploadService().getPackages({
                uid: token.user.uid,
                superior: query.superior
            })
        }
    }

    @UseGuards( AuthGuard('jwt'))
    @Post('delPackages') // 删除文件
    async delPackage (@Query() query, @Request() token):Promise<any> {
        if(!query.superior) {
            return {
                statusCode: 999,
                message: `文件夹类型不能为空`,
            }
        }
        return {
            statusCode: 200,
            data: await new UploadService().delPackages({
                uid: token.user.uid,
                superior: query.superior
            })
        }
    }
}
