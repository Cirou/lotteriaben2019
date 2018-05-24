import { Gruppi } from './Gruppi';
import { Profilo } from './Profilo';
import { Cibi } from './Cibi';

export class User {

  email: string
  password: string
  id: string
  profilo: Profilo
  elencoGruppi: Gruppi[]
  elencoCibi: Cibi[]

}
