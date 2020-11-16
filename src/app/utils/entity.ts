import { createKlassDecorator } from './decorator';

export const ID = Symbol();
type IDT<T> = { [ID]: T };
const DateSym = Symbol();
export type ID<T = any> = string & IDT<T>;

export type DateString = string & { [DateSym]: string };

export interface BaseEntity<T = any> {
  id: ID<T>;
  createDate: DateString;
}

export const Entity = createKlassDecorator(`entity`, () => (str: string) => str);
