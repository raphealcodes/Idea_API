import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IdeasEntity } from '../ideas/ideas.entity';
import { UserDTO, UserRO } from '../ideas/models/user-model';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) private resp: Repository<UserEntity> ) { }

    async showAll(): Promise<UserRO[]> {
        const users = await this.resp.find({relations: ['ideas']});
        return users.map(user => user.responseObject(false));

    }

    async login(data: UserDTO): Promise<UserRO> {
        const { username, password } = data;
        const user = await this.resp.findOne({ where: { username } });
        if (!user || !(user.ComparePassword(password))) {
            throw new HttpException('Incorrect Username/password', HttpStatus.BAD_REQUEST);
        }
        return user.responseObject();
    }

    async register(data: UserDTO): Promise<UserRO> {
        const { username } = data;
        let user = await this.resp.findOne({ where: { username } });
        if (user) {
            throw new HttpException('Username Exist', HttpStatus.BAD_REQUEST);
        }

        user = await this.resp.create(data);
        await this.resp.save(user);
        return user.responseObject();

    }

    async delete(id: string) {
        const user = await this.resp.findOne({ where: { id } });
        if (!user) {
            throw new HttpException('Not Found', HttpStatus.BAD_REQUEST);
        }
        await this.resp.delete(id);
        return user.responseObject();
    }
}
