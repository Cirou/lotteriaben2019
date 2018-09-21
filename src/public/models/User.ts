import { Food } from './Food';
import { Group } from './Group';

export class User {

  id: number;

  nome: string;

  cognome: string;

  email: string;

  sesso: string;

  citta: string;

  nickname: string;

  immagine: string;

  foods: Food[];

  groups: Group[];

}
