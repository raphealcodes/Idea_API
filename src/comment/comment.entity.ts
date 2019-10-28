import { Column, CreateDateColumn, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IdeasEntity } from '../ideas/ideas.entity';
import { UserEntity } from '../user/user.entity';

@Entity('comment')
export class CommentEntity {

    @PrimaryGeneratedColumn('uuid') id: string;

    @CreateDateColumn() created: Date;

    @Column('text') comment: string;

    @ManyToOne(type => UserEntity)
    @JoinTable()
    author: UserEntity;

    @ManyToOne(type => IdeasEntity, idea => idea.comment)
    idea: IdeasEntity;

}
