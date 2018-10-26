import { Group } from './Group';
import { User } from './User';

export class Message {

  id: number;

  group: Group;

  user: User;

  text: string;

  data: string;

}
