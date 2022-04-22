import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { User } from './_entity/user.entity';
import { AppService } from './app.service';

import { NoteModule } from './note/note.module';

import { UploadModule } from './upload/upload.module';

import { UserModule } from './user/user.module';

@Module({
  imports: [ NoteModule, UploadModule, UserModule, TypeOrmModule.forRoot() ],
  providers: [AppService],
})
export class AppModule {}
