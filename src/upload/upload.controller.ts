import { Body, Controller, Get, Post, Render, Response, HttpException, HttpStatus, UseInterceptors,UploadedFiles } from '@nestjs/common';
import { FileInterceptor,FilesInterceptor,AnyFilesInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';

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

    @Post('setPackages')
    @UseInterceptors(AnyFilesInterceptor())
    async setPackages(@UploadedFiles() files, @Body() body){
        return {
            statusCode: 200,
            data: await new UploadService().setPackages(files, 'note')
        }
    }
}
