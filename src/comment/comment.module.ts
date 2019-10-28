import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/user.entity';
import { IdeasEntity } from '../ideas/ideas.entity';
import { CommentEntity } from './comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity, UserEntity, IdeasEntity])],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
