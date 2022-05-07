import { NextApiResponse } from 'next';
import { DeleteList } from '../../../constants/types/http-types';
import listRepository from '../../../repositories/list.repository';

const handler = async (req: DeleteList, res: NextApiResponse) => {
  const listId = await listRepository.deleteList(req.query.list);
  res.send({ listId });
};

export default handler;
