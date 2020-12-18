import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, OneToMany } from 'typeorm';


@Entity('rooms')
export class RoomsEntity {
    @PrimaryGeneratedColumn('uuid') id: string;

    @CreateDateColumn() created: Date;

    @UpdateDateColumn() update: Date;

    @Column('text') room: string;

    @Column('numeric') cost: number;

    // @ManyToOne(type => UserEntity, author => author.ideas)
    // author: UserEntity;

    // @OneToMany(type => CommentEntity, comment => comment.idea, {cascade: true})
    // comment: CommentEntity[];
}
