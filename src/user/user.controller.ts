import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { User } from 'src/ideas/shared/user-decorator';
import { UserDTO } from '../ideas/models/user-model';
import { UserService } from './user.service';
import { AuthGuard } from '../ideas/shared/auth-guard';

@Controller()
export class UserController {
    constructor(private service: UserService) { }
    @Get('api/user')
    showAll() {
        return this.service.showAll();
    }

    @Post('login')
    login(@Body() data: UserDTO) {
        return this.service.login(data);
    }

    @Post('register')
    register(@Body() data: UserDTO) {
        return this.service.register(data);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.service.delete(id);
    }
}
