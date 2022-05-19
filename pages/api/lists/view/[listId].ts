import { NextApiResponse } from 'next';
import { GetList } from '../../../../constants/types/http-types';
import listRepository from '../../../../repositories/list.repository';

const handler = async (req: GetList, res: NextApiResponse) => {
  const { listId } = req.query;

  const list = await listRepository.getList(listId);
  return res.send({
    list
  });
};

export default handler;
