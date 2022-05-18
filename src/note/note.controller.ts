import { Body, Controller, UseGuards, Post, Render, Response, HttpException, HttpStatus, UseInterceptors,UploadedFiles } from '@nestjs/common';
import { FileInterceptor,FilesInterceptor,AnyFilesInterceptor } from '@nestjs/platform-express';
import { NoteService } from './note.service';
import { VerifiEmptyField } from '../_utils/index'

// jwt
import { AuthGuard } from '@nestjs/passport';

@Controller('note')
export class NoteController {
    @Post('getNoteListAll')
    async getNoteListAll(@Body() body):Promise<any> {
        return {
            statusCode: 200,
            data: await new NoteService().getNoteListAll(body)
        }
    }

    @Post('getNoteListPublished')
    async getNoteListPublished(@Body() body):Promise<any> {
        const { type, uid, drawe, noteid } = body
        /**
         * 筛选发布的文章
         * type -- explain -- params -- resultType
         * 0 -- 某人发布的文章 -- {uid} -- []
         * 1 -- 某个分类的文章 -- {drawe} -- []
         * 2 -- 某一篇文章 -- {noteid} -- {}
         * 3 -- 某人点赞的文章 -- {uid} -- []
         * 4 -- 某人收藏的文章 -- {uid} -- []
         * 5 -- 某人浏览的文章 -- {uid} -- []
         * 6 -- 点赞量前二十 -- {} -- []
         * 7 -- 收藏量前二十 -- {} -- []
         * 8 -- 浏览量前二十 -- {} -- []
         * 9 -- 随机抽取二十篇文章 -- {} -- []
         */
        if([0, 3, 4, 5].includes(Number(type)) && !uid) {
            return {
                statusCode: 999,
                message: `该查询类型时uid不能为空`
            }
        }
        if(Number(type) === 1 && !drawe) {
            return {
                statusCode: 999,
                message: `该查询类型时drawe不能为空`
            }
        }
        if(Number(type) === 2 && !noteid) {
            return {
                statusCode: 999,
                message: `该查询类型时noteid不能为空`
            }
        }
        return {
            statusCode: 200,
            data: await new NoteService().getNoteListPublished(body)
        }
    }

    @UseGuards( AuthGuard('jwt'))
    @Post('getNoteList')
    async getNoteList(@Body() body):Promise<any> {
        return {
            statusCode: 200,
            data: await new NoteService().getNoteList(body)
        }
    }
    
    @UseGuards( AuthGuard('jwt'))
    @Post('addNote')
    async addtNote (@Body() body):Promise<any> {
        return {
            statusCode: 200,
            data: await new NoteService().addNote(body)
        }
    }

    @UseGuards( AuthGuard('jwt'))
    @Post('editNote')
    @VerifiEmptyField(['noteid'])
    async editNote (@Body() body):Promise<any> {
        return {
            statusCode: 200,
            data: await new NoteService().editNote(body)
        }
    }

    @UseGuards( AuthGuard('jwt'))
    @Post('removeNote')
    @VerifiEmptyField(['noteid'])
    async removeNote (@Body() body):Promise<any> {
        return {
            statusCode: 200,
            data: await new NoteService().removeNote(body)
        }
    }
}
