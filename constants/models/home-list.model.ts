import { Home, HomeList as DbList } from '@prisma/client';

export interface HomeList extends DbList {}

export interface LoadHomeList {
  list: HomeList;
  homes: Home[];
  page: number;
  limit: number;
}
