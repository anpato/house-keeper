import { NextApiRequest } from 'next';
import { AdditionForm } from '../../store/types/addition-form.store';

export interface CreateList extends NextApiRequest {
  query: {
    user: string;
  };
  body: {
    name: string;
  };
}

export interface GetLists extends NextApiRequest {
  query: {
    user: string;
  };
}

export interface CreateHome extends NextApiRequest {
  query: {
    user: string;
  };
  body: AdditionForm;
}

export interface GetHomes extends NextApiRequest {
  query: {
    user: string;
  };
}
