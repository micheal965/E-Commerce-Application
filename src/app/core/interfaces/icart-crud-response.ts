import { Icart } from './icart';

export interface IcrudCartResponse {
  message: string;
  numOfCartItems: number;
  data: Icart;
}
