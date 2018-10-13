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

  colore: string;

  foods: Food[];

  groups: Group[];

}
