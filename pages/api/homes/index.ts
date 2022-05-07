import { StatusCodes } from 'http-status-codes';
import { NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { CreateHome, GetHomes } from '../../../constants/types/http-types';
import homeRepository from '../../../repositories/home.repository';

const handler = async (req: CreateHome | GetHomes, res: NextApiResponse) => {
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
    default:
      const homes = await homeRepository.getRecentHomes(req.query.user);
      return res.send(homes);
  }
};

export default handler;
