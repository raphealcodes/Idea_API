import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { CommentEntity } from '../comment/comment.entity';

@Entity('ideas')
export class IdeasEntity {
    @PrimaryGeneratedColumn('uuid') id: string;

    @CreateDateColumn() created: Date;

    @UpdateDateColumn() update: Date;

    @Column('text') idea: string;

    @Column('text') description: string;

    @ManyToOne(type => UserEntity, author => author.ideas)
    author: UserEntity;

    @OneToMany(type => CommentEntity, comment => comment.idea, {cascade: true})
    comment: CommentEntity[];
}
