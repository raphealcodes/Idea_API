import { IsString } from 'class-validator';
import { UserRO } from './user-model';

export class IdeasDTO {
    @IsString()
    idea: string;

    @IsString()
    description: string;
}

export interface IdeasRO {
    id: string;
    created: Date;
    idea: string;
    description: string;
    author: UserRO;
    update: Date;
}
