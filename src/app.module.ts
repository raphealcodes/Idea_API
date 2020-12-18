import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IdeasModule } from './ideas/ideas.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { CommentModule } from './comment/comment.module';
import { RoomsModule } from './rooms/rooms.module';

@Module({
  imports: [TypeOrmModule.forRoot(), IdeasModule, UserModule, CommentModule, RoomsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
