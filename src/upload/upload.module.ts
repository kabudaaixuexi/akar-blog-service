import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
// jwt
import { JwtStrategy } from "../jwt/jwt.strategy";
import { JwtModule } from "@nestjs/jwt";
import { jwtKey } from "../_config";
@Module({
  imports:[
    JwtModule.register({
      //生成token的key
      secret: jwtKey.secret,
      // signOption可以在JwtModule设定
      // 或是在createToken时候设定
      signOptions: {
        //token的有效时长
        // expiresIn: "7d",
      },
    }),
  ],
  controllers: [UploadController],
  providers: [UploadService, JwtStrategy]
})
export class UploadModule {}
