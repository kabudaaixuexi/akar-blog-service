import { Body, Controller, Get, Post, Render, Response, HttpException, HttpStatus, UseInterceptors,UploadedFiles } from '@nestjs/common';
import { FileInterceptor,FilesInterceptor,AnyFilesInterceptor } from '@nestjs/platform-express';
import { NoteService } from './note.service';
import { VerifiEmptyField } from '../_utils/index'

@Controller('note')
export class NoteController {
    @Post('getNoteListAll')
    async getNoteListAll(@Body() body):Promise<any> {
        return {
            statusCode: 200,
            data: await new NoteService().getNoteListAll(body)
        }
    }

    @Post('getNoteList')
    @VerifiEmptyField(['uid'])
    async getNoteList(@Body() body):Promise<any> {
        return {
            statusCode: 200,
            data: await new NoteService().getNoteList(body)
        }
    }
    
    @Post('addNote')
    @VerifiEmptyField(['uid'])
    async addtNote (@Body() body):Promise<any> {
        return {
            statusCode: 200,
            data: await new NoteService().addNote(body)
        }
    }

    
    @Post('editNote')
    @VerifiEmptyField(['uid', 'noteid'])
    async editNote (@Body() body):Promise<any> {
        return {
            statusCode: 200,
            data: await new NoteService().editNote(body)
        }
    }

    @Post('removeNote')
    @VerifiEmptyField(['uid', 'noteid'])
    async removeNote (@Body() body):Promise<any> {
        return {
            statusCode: 200,
            data: await new NoteService().removeNote(body)
        }
    }
}
