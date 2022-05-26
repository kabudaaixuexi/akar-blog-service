import {
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WsResponse,
  WebSocketServer,
} from "@nestjs/websockets";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { News } from "src/_entity/news.entity";
import { SocketService } from "./socket.service";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { Socket, Server } from "socket.io";
import { Logger } from "@nestjs/common";
interface DepNew {
  formUid: number; // id
  formUserId: string; //
  groupId: string; //
  message: string; //
  msgId: string;
  msgType: number;
  sendTime: string;
  needFeedBack: boolean;
  sid: string
}
@WebSocketGateway(18099, { cors: true })
export class SocketGateway implements OnGatewayInit {
  constructor(
    @InjectRepository(News)
    private readonly newsRepository: Repository<News>
  ) {}

  @WebSocketServer() wss: Server;
  private logger: Logger = new Logger("usersRepository");
  private computedHum: any[] = []; // 房间计数
  private depNews: DepNew[] = []; // 消息缓存
  afterInit(server: any) {
    this.logger.log("usersRepository");
  }

  // 加入房间 letter / essay
  @SubscribeMessage("joinRoom")
  joinRoom(client: Socket, name: string) {
    client.join(name);
    this.wss.to(name).emit("joinRoomSuccess", `加入${name}成功`);
    client.on(name, (payload) => {
      this.wss.to(name).emit(name, payload);
      if (name === "letter") {
        // 私信入库
        this.newsRepository.save(payload);
      }
    });
  }
}
