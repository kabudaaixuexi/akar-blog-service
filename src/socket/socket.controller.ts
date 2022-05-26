import { Body, Controller, Request, Post, UseGuards, Render, Response, HttpException, HttpStatus, UseInterceptors,UploadedFiles } from '@nestjs/common';
import { SocketService } from './socket.service';
import { VerifiEmptyField } from '../_utils/index'
// jwt
import { AuthGuard } from '@nestjs/passport';
@Controller('soc')
export class SocketController {

    constructor(private readonly socketService: SocketService) {}

    @Post('getNewsAll')
    async getNewsAll(@Body() body):Promise<any> {
        return {
            statusCode: 200,
            data: await  this.socketService.findAll()
        }
    }

    // @UseGuards( AuthGuard('jwt'))
    // @Post('getNewsByUser')
    // @VerifiEmptyField(['uid'])
    // async getNewsByUser( @Body() body,@Request() token,):Promise<any> {
    //     console.log(body.uid, token.user.uid);
        
    //     const [res01, res02] = await Promise.all([
    //         this.socketService.findByUid(body.uid, token.user.uid),
    //         this.socketService.findToUid(body.uid, token.user.uid)
    //     ])
    //     return {
    //         statusCode: 200,
    //         data: [
    //             ...res01,
    //             ...res02
    //         ]
    //     }
    // }

    // @UseGuards( AuthGuard('jwt'))
    // @Post('getNewsBySelf')
    // async getNewsBySelf( @Body() body,@Request() token,):Promise<any> {
    //     console.log(token.user.uid);
    //     return {
    //         statusCode: 200,
    //         data: await  this.socketService.findBySelf(token.user.uid)
    //     }
    // }

    @UseGuards( AuthGuard('jwt'))
    @Post('getNewsUserList')
    async getNewsUserList( @Body() body,@Request() token,):Promise<any> {
        const res = await  this.socketService.findBySelf(token.user.uid)
        let keys = Array.from(new Set([
            ...res.map(ev => ev.formUserId),
            ...res.map(ev => ev.sid)
        ])).filter(ev => ev !== token.user.uid)

        const res01 = (await Promise.all(
            keys.map(ei => this.socketService.findByUid(ei, token.user.uid))
        ))
        // 统一根据时间正序
        const res02 = res01.map(item => {
            return item.sort(function(a, b){
                return a.sendTime < b.sendTime ? -1 : 1
            })
        })
        const res03 = res02.sort(function(a, b){
            return b[b.length - 1].sendTime < a[a.length - 1].sendTime ? -1 : 1
        })
        const data = {}
        res03.forEach(item => {
            if (item[0].formUserId !== token.user.uid) {
                data[item[0].formUserId] = item
            } else {
                data[item[0].sid] = item
            }
        });
        return {
            statusCode: 200,
            data 
        }
    }
}
