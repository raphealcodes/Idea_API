import { IsString } from 'class-validator';
import { UserRO } from '../user/userDTO';

export class IdeaDTO {
    @IsString()
    idea: string;

    @IsString()
    description: string;
}

export interface IdeaRO {
    author: UserRO;
    id?: string;
    created: Date;
    updated: Date;
    idea: string;
    description: string;
}
