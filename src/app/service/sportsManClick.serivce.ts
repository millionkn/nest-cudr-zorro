import { Injectable } from '@angular/core';
import { SportsManEntity } from '../entities';

@Injectable({
  providedIn: 'root'
})
export class SportsManClickService {
  base: 'biathlon' | 'skijump' = 'biathlon'
  sportsManId = null as null | SportsManEntity['id']
}
