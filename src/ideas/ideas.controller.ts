import { Controller, Get, Post, Put, Delete, Param, Body, UsePipes, UseGuards } from '@nestjs/common';
import { IdeasService } from './ideas.service';
import { IdeasDTO } from './models/idea-model';
import { ValidationPipe } from './shared/error-validation';
import { AuthGuard } from './shared/auth-guard';
import { User } from './shared/user-decorator';

@Controller('ideas')
export class IdeasController {
    constructor(private service: IdeasService) {}

    @Get()
    showAll() {
     return  this.service.showAll();
    }

    @Get(':id')
    readId(@Param('id') id: string) {
     return  this.service.read(id);
    }

    @Post()
    @UsePipes(new ValidationPipe())
    @UseGuards(new AuthGuard())
    create(@User('id') user, @Body() data: IdeasDTO) {
      return  this.service.create(data, user);
    }

    @Put(':id')
    @UsePipes(new ValidationPipe())
    @UseGuards(new AuthGuard())
    update(@Param('id') id: string, @Body() data: Partial<IdeasDTO>, @User('id') user: string) {
       return this.service.update(id, data, user);
    }

    @Delete(':id')
    @UseGuards(new AuthGuard())
    delete(@Param('id') id: string, @User('id') user: string) {
        return this.service.delete(id, user);
    }

    @Post(':id/bookmark')
    @UseGuards(new AuthGuard())
    bookmark(@Param('id') id: string, @User('id') user: string) {
      return this.service.bookmark(id, user);
    }
    @Delete(':id/bookmark')
    @UseGuards(new AuthGuard())
    unbookmark(@Param('id') id: string, @User('id') user: string) {
      return this.service.unbookmark(id, user);
    }

}
