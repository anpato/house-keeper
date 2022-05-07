import { StatusCodes } from 'http-status-codes';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import userRepository from '../../../repositories/user.repository';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  if (session) {
    const profile = await userRepository.getProfile(
      session.user?.email as string
    );
    return res.status(StatusCodes.OK).send(profile);
  }
  res.status(401).send({ message: 'Unauthorized' });
};

export default handler;
