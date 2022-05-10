import { HomeList } from '../../constants/models/home-list.model';
import { Home } from '../../constants/models/home.model';

export interface ListStore {
  list: HomeList | null;
  page: number;
  limit: number;
  homes: Home[];
}
