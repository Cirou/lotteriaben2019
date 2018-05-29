import { Gruppo } from './Gruppo';
import { Profilo } from './Profilo';
import { Cibo } from './Cibo';

export class User {

  email: string;
  password: string;
  id: string;
  profilo: Profilo = new Profilo;
  elencoGruppi: string[];
  elencoCibi: string[];

}
