import { NextApiResponse } from 'next';
import { GetLists } from '../../../constants/types/http-types';
import listRepository from '../../../repositories/list.repository';
const handler = async (req: GetLists, res: NextApiResponse) => {
  const lists = await listRepository.getListNames(req.query.user);
  res.send(lists);
};

export default handler;
