import { StatusCodes } from 'http-status-codes';
import { NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { CreateList, GetLists } from '../../../constants/types/http-types';
import listRepository from '../../../repositories/list.repository';

const handler = async (req: CreateList & GetLists, res: NextApiResponse) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(StatusCodes.UNAUTHORIZED).send({
      message: 'Unauthorized'
    });
  }

  switch (req.method) {
    case 'POST':
      req = req as CreateList;
      req.body.name;
      const list = await listRepository.createList(
        req.query.user,
        req.body.name
      );
      return res.status(StatusCodes.CREATED).send(list);
    default:
      const lists = await listRepository.getLists(req.query.user);
      return res.send(lists);
  }
};

export default handler;
