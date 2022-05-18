import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../_entity/user.entity";

// jwt
import { JwtStrategy } from "../jwt/jwt.strategy";
import { JwtModule } from "@nestjs/jwt";
import { jwtKey } from "../_config";
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
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
  providers: [UserService, JwtStrategy],
  controllers: [UserController],
})
export class UserModule {}
