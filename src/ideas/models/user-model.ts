import { IdeasEntity } from '../ideas.entity';

export class UserDTO {
    username: string;
    password: string;
}

export interface UserRO {
    username: string;
    created: Date;
    id: string;
    token?: string;
    ideas?: IdeasEntity[];
    bookmarks?: IdeasEntity[];
}
