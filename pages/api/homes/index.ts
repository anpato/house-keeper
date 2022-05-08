import { StatusCodes } from 'http-status-codes';
import { NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import {
  CreateHome,
  DeleteHome,
  GetHomes
} from '../../../constants/types/http-types';
import homeRepository from '../../../repositories/home.repository';

const handler = async (
  req: CreateHome | GetHomes | DeleteHome,
  res: NextApiResponse
) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(StatusCodes.UNAUTHORIZED).send({
      message: 'Unauthorized'
    });
  }

  switch (req.method) {
    case 'POST':
      req = req as CreateHome;
      const home = await homeRepository.createHome(req.body, req.query.user);

      return res.status(StatusCodes.CREATED).send(home);
    case 'DELETE':
      req = req as DeleteHome;
      const homeDeleted = await homeRepository.deleteHome(req.query.home);

      return res.send(homeDeleted);
    default:
      req = req as GetHomes;
      const homes = await homeRepository.getRecentHomes(req.query.user);

      return res.send(homes);
  }
};

export default handler;
