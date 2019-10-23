import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { IdeasEntity } from '../ideas/ideas.entity';
import { UserRO } from '../ideas/models/user-model';

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn('uuid') id: string;

    @CreateDateColumn() created: Date;

    @Column({ type: 'text' , unique: true }) username: string;

    @Column('text') password: string;

    @OneToMany(type => IdeasEntity, ideas => ideas.author)
    ideas: IdeasEntity[];

    @ManyToMany(type => IdeasEntity, {cascade: true})
    @JoinTable()
    bookmarks: IdeasEntity[];

    @BeforeInsert()
    async HashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }

    async ComparePassword(attempt: string) {
        return await bcrypt.compare(this.password, attempt);
    }

    private get token() {
        const { id, username } = this;
        return  jwt.sign({ id, username }, process.env.SECRET, { expiresIn: '7d' });
    }

    responseObject(showToken: boolean= true) {
        const {id, created, token, username} = this;
        const toResponseObject: UserRO = {id, created,  username};

        if (showToken) {
            toResponseObject.token = token;
        }
        if (this.ideas) {
            toResponseObject.ideas = this.ideas;
        }
        if (this.bookmarks) {
            toResponseObject.bookmarks = this.bookmarks;
        }
        return toResponseObject;
    }

}
