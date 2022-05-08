import { Home } from '@prisma/client';
import moment from 'moment';
import { db } from '../db';
import { AdditionForm } from '../store/types/addition-form.store';

class HomeRepository {
  private home = db.home;

  async createHome(data: AdditionForm, userId: string) {
    const home = await this.home.create({
      data: {
        ...data,
        userId
      }
    });
    return home;
  }

  async getRecentHomes(userId: string) {
    const homes = await this.home.findMany({
      where: {
        AND: [
          { userId },

          {
            createdAt: {
              gte: moment().subtract(7, 'days').toDate()
            }
          }
        ]
      },
      orderBy: {
        rating: 'desc'
      }
    });
    return homes;
  }

  async deleteHome(homeId: string): Promise<Home> {
    const home = await this.home.delete({
      where: {
        id: homeId
      }
    });
    return home;
  }
}

export default new HomeRepository();
