import { IsNumber, IsString } from 'class-validator';
import { UserRO } from './user-model';

export class RoomDTO {
    @IsString()
    room: string;

    @IsNumber()
    cost: number;
}

export interface RoomsRO {
    id: string;
    created: Date;
    room: string;
    cost: number;
    author: UserRO;
    update: Date;
}
