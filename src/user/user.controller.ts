import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { getTime, getUuiD, VerifiEmptyField } from '../_utils/index'

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) {}

    @Post('getUserList')
    async getUserList(@Body() body):Promise<any> {
        return {
            statusCode: 200,
            data: await this.userService.findAll()
        }
    }

    @Post('getUser')
    @VerifiEmptyField(['uid'])
    async getUser(@Body() body):Promise<any> {
        const result = await this.userService.findUserName(body.uid)
        if(result && result.length) {
            return {
                statusCode: 200,
                data: result[0]
            }
        } else {
            return {
                statusCode: 999,
                message: '未找到该用户'
            }
        }
    }

    @Post('register')
    async register(@Body() body):Promise<any> {
        const res = await this.userService.findUserName(body.userName)
        if (res.length) {
            return {
                statusCode: 999,
                message: '已存在该昵称用户，换个昵称吧～'
            }
        }
        return {
            statusCode: 200,
            data: {
                ... await this.userService.saveOne({
                    userName: body.userName,
                    passWord: body.passWord,
                    photo: body.photo,
                    uid: body.uid || getUuiD(),
                    createdAt: getTime(),
                    updatedAt: getTime(),
                }),
                token:  this.userService.createToken({
                    userName: body.userName,
                    passWord: body.passWord,
                })
            }
        }
    }

    @Post('login')
    async login(@Body() body):Promise<any> {
        const res = await this.userService.findUserName(body.userName)
        if (!res.length) {
            return {
                statusCode: 999,
                message: '找不到该账号用户，请先注册'
            }
        }
        if (res[0].passWord != body.passWord) {
            return {
                statusCode: 999,
                message: '密码错误'
            }
        }
        return {
            statusCode: 200,
            data: {
                ...res[0],
                token:  this.userService.createToken(res[0])
            }
        }
    }

    @Post('decorate')
    @VerifiEmptyField(['uid', 'extData'])
    async decorate(@Body() body):Promise<any> {
        const target = await this.userService.findUserName(body.uid)
        // target
        await this.userService.updateOne({
            ...target[0],
            extData: body.extData,
        })
        return {
            statusCode: 200
        }
    }

    @Post('modify')
    async modify(@Body() body):Promise<any> {
        const res = await this.userService.findUserName(body.userName)
        if (body.userName && res.length && res.id != body.id) {
            return {
                statusCode:  999,
                message: '已存在重复昵称' 
            }
        }
        await this.userService.updateOne({
            id: body.id,
            userName: body.userName,
            passWord: body.passWord,
            photo: body.photo,
            phone: body.phone,
            extData: body.extData,
            role:body.role || 0,
            uid: body.uid,
            createdAt: body.createdAt,
            updatedAt: getTime(),

            userIntro: body.userIntro,
            userGender: body.userGender,
            userEmail: body.userEmail,
            userPhone: body.userPhone,
            userRegion: body.userRegion,
            userOffice: body.userOffice,
            userBirth: body.userBirth,
            showExtend: body.showExtend,
            showLinks: body.showLinks,
            userLinks: body.userLinks
        })
        const data = await this.userService.findId(body.id) || []
        return {
            statusCode: 200,
            data: data[0]
        }
    }
}
