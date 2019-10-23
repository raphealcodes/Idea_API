import { Module } from '@nestjs/common';
import { IdeasController } from './ideas.controller';
import { IdeasService } from './ideas.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IdeasEntity } from './ideas.entity';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptions } from './shared/http-exception-filter';
import { UserEntity } from '../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([IdeasEntity, UserEntity])],
  controllers: [IdeasController],
  providers: [IdeasService, {provide: APP_FILTER, useClass: HttpExceptions}],
})
export class IdeasModule {}
