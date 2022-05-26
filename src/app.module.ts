import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppService } from './app.service';

import { NoteModule } from './note/note.module';

import { UploadModule } from './upload/upload.module';

import { UserModule } from './user/user.module';

import { SocketModule } from './socket/socket.module';


@Module({
  imports: [ SocketModule, NoteModule, UploadModule, UserModule, TypeOrmModule.forRoot() ],
  providers: [AppService],
})
export class AppModule {}
