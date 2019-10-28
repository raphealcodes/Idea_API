import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { CommentEntity } from './comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { IdeasEntity } from '../ideas/ideas.entity';
import { CommentDTO } from '../ideas/models/comment-model';

@Injectable()
export class CommentService {
    constructor(@InjectRepository(CommentEntity) private commentResp: Repository<CommentEntity>,
                @InjectRepository(UserEntity) private userResp: Repository<UserEntity>,
                @InjectRepository(IdeasEntity) private ideaResp: Repository<IdeasEntity> ) {}

                private toResponseObject(comment: CommentEntity) {
                  const responseObject: any = comment;
                  if (comment.author) {
                    responseObject.author = comment.author.responseObject();
                  }
                  return responseObject;
                }

              async showCommentByIdea(id: string) {
                const idea = await this.ideaResp.findOne({where: {id}, relations: ['comment', 'comment.idea', 'comment.author']});
                return idea.comment.map(comment => this.toResponseObject(comment));
              }

              async showCommentByUser(id: string) {
                const comment = await this.commentResp.find({where: {author: {id}}, relations: ['author']});
                return comment.map(comments => this.toResponseObject(comments));
              }

              async showComment(id: string) {
                const comment = await this.commentResp.findOne({where: {id}, relations: ['author', 'idea']});
                return this.toResponseObject(comment);
                }

                async postComment(ideaId: string, data: CommentDTO, userId: string) {
                    const user = await this.userResp.findOne({where: {id: userId}});
                    const idea = await this.ideaResp.findOne({where: {id: ideaId}});
                    const comment = await this.commentResp.create({...data, idea, author: user});
                    await this.commentResp.save(comment);
                    return this.toResponseObject(comment);
                }

                async destroy(id: string, userId: string) {
                  const comment = await this.commentResp.findOne({where: {id}, relations: ['author', 'idea']});
                  if (comment.author.id !== userId) {
                    throw new HttpException('can not delete', HttpStatus.UNAUTHORIZED);
                  }
                  await this.commentResp.remove(comment);
                  return this.toResponseObject(comment);
                }
}
