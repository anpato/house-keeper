import { NextApiResponse } from 'next';
import { GetList } from '../../../../constants/types/http-types';
import homeRepository from '../../../../repositories/home.repository';

const handler = async (req: GetList, res: NextApiResponse) => {
  const { listId, page, limit } = req.query;

  const {
    homes,
    page: currentPage,
    pages
  } = await homeRepository.getPaginatedHomes(
    listId,
    Number(page),
    Number(limit)
  );

  res.send({
    homes,
    currentPage: currentPage || page,
    pages: pages || 0,
    limit: Number(limit)
  });
};

export default handler;
