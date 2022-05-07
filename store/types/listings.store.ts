import { Home, HomeList } from '@prisma/client';

export interface HomeListWithCount extends HomeList {
  _count: { homes: number };
}

export interface ListingStore {
  homes: Home[];
  recentHomes: Home[];
  lists: HomeListWithCount[];
  sharedLists: HomeList[];
}
