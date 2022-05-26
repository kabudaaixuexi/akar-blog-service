import { Module } from "@nestjs/common";

// soc
import { SocketService } from "./socket.service";
import { SocketController } from "./socket.controller";
import { SocketGateway } from './ws.gateway'

// sql
import { TypeOrmModule } from "@nestjs/typeorm";
import { News } from "../_entity/news.entity";

// jwt
import { JwtStrategy } from "../jwt/jwt.strategy";
import { JwtModule } from "@nestjs/jwt";
import { jwtKey } from "../_config";
@Module({
  imports: [
    TypeOrmModule.forFeature([News]),
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
  providers: [SocketService, JwtStrategy, SocketGateway],
  controllers: [SocketController],
})
export class SocketModule {}
