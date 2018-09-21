import { Group } from './Group';
import { User } from './User';

export class Message {

  id: number;

  group_id: number;

  user_id: User;

  text: string;

  data: Date;

}
