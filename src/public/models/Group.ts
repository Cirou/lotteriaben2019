import { User } from './User';

export class Group {

  id: number;

  nome: string;

  descrizione: string;

  immagine: string;

  users: User[];

}
