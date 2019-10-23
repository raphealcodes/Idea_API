import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { IdeasEntity } from './ideas.entity';
import { IdeasDTO, IdeasRO } from './models/idea-model';

@Injectable()
export class IdeasService {
    constructor(@InjectRepository(IdeasEntity) private resp: Repository<IdeasEntity>,
                @InjectRepository(UserEntity) private respa: Repository<UserEntity>) { }

    private responseObject(idea: IdeasEntity) {
        return { ...idea, author: idea.author ? idea.author.responseObject(true) : null };
    }

    private ensureOwnerShip(idea: IdeasEntity, userId: string) {
        if (idea.author.id !== userId) {
            throw new HttpException('InCorrect User', HttpStatus.UNAUTHORIZED);
        }
    }

    async showAll(): Promise<IdeasRO[]> {
        const ideas = await this.resp.find({ relations: ['author'] });
        return ideas.map(idea => this.responseObject(idea));
    }

    async read(id: string): Promise<IdeasRO> {
        const idea = await this.resp.findOne({ where: { id }, relations: ['author'] });
        if (!idea) {
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        }
        return this.responseObject(idea);
    }

    async create(data: IdeasDTO, userId: string): Promise<IdeasRO> {
        const user = await this.respa.findOne({ where: { id: userId } });
        const idea = this.resp.create({ ...data, author: user });
        await this.resp.save(idea);
        return this.responseObject(idea);
    }

    async update(id: string, data: Partial<IdeasDTO>, userId: string): Promise<IdeasRO> {
        let idea = await this.resp.findOne({ where: { id }, relations: ['author'] });
        if (!idea) {
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        }
        this.ensureOwnerShip(idea, userId);
        await this.resp.update({ id }, data);
        idea = await this.resp.findOne({ where: { id }, relations: ['author'] });
        return this.responseObject(idea);
    }

    async delete(id: string, userId: string) {
        const idea = await this.resp.findOne({ where: { id }, relations: ['author'] });
        if (!idea) {
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        }
        this.ensureOwnerShip(idea, userId);
        await this.resp.delete(id);
        return this.responseObject(idea);
    }

    async bookmark(id: string, userId: string) {
        const idea = await this.resp.findOne({ where: { id } });
        const user = await this.respa.findOne({ where: { id: userId }, relations: ['bookmarks'] });

        if (user.bookmarks.filter(bookmark => bookmark.id === idea.id).length < 1) {
            user.bookmarks.push(idea);
            await this.respa.save(user);
        } else {
            throw new HttpException('Already Bookmark', HttpStatus.BAD_REQUEST);
        }
        return user.responseObject();
    }

    async unbookmark(id: string, userId: string) {
        const idea = await this.resp.findOne({ where: { id } });
        const user = await this.respa.findOne({ where: { id: userId }, relations: ['bookmarks'] });

        if (user.bookmarks.filter(bookmark => bookmark.id === idea.id).length > 0) {
            user.bookmarks = user.bookmarks.filter(bookmark => bookmark.id !== idea.id);
            await this.respa.save(user);
        } else {
            throw new HttpException('Cannot Bookmark', HttpStatus.BAD_REQUEST);
        }
        return user.responseObject();
    }
}
