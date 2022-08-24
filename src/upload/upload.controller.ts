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
        return {
            statusCode: 200,
            data: await new UploadService().delPortfolio({
                uid: token.user.uid,
                superior: query.superior
            })
        }
    }

    @UseGuards( AuthGuard('jwt'))
    @Post('renamePortfolio') // 文件夹重命名
    async renamePortfolio (@Request() token, @Query() query):Promise<any> {
        return {
            statusCode: 200,
            data: await new UploadService().renamePortfolio({
                uid: token.user.uid,
                superior: query.superior,
                name: query.name
            })
        }
    }
    @UseGuards( AuthGuard('jwt'))
    @Post('renamePackage') // 文件重命名
    async renamePackage (@Request() token, @Query() query):Promise<any> {
        return {
            statusCode: 200,
            data: await new UploadService().renamePackage({
                uid: token.user.uid,
                superior: query.superior,
                name: query.name
            })
        }
    }
    

    @UseInterceptors(AnyFilesInterceptor())
    @UseGuards( AuthGuard('jwt'))
    @Post('setPackages') // 添加文件
    async setPackages(@UploadedFiles() files, @Request() token, @Query() query ){
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
        return {
            statusCode: 200,
            data: await new UploadService().delPackages({
                uid: token.user.uid,
                superior: query.superior
            })
        }
    }
}
