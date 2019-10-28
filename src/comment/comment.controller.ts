import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { User } from 'src/ideas/shared/user-decorator';
import { CommentDTO } from '../ideas/models/comment-model';
import { AuthGuard } from '../ideas/shared/auth-guard';
import { CommentService } from './comment.service';

@Controller('comment')
export class CommentController {
    constructor(private service: CommentService) { }
    @Get('idea/:id')
    showCommentByIdea(@Param('id') idea: string) {
        return this.service.showCommentByIdea(idea);
    }

    @Get('user/:id')
    showCommentByUser(@Param('id') user: string) {
        return this.service.showCommentByUser(user);
    }

    @Get(':id')
    showComment(@Param('id') id: string) {
        return this.service.showComment(id);
    }

    @Post('ideas/:id')
    @UseGuards(new AuthGuard())
    postComment(@Param('id') id: string, @Body() data: CommentDTO, @User('id') userId: string) {
        return this.service.postComment(id, data, userId);
    }

    @Delete(':id')
    @UseGuards(new AuthGuard())
    destroy(@Param('id') id: string, @User('id') userId: string) {
        return this.service.destroy(id, userId);
    }

}
