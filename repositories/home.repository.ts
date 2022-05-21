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
      },
      take: 4
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

  async getPaginatedHomes(
    listId: string,
    page: number = 1,
    limit: number = 10
  ) {
    const count = await this.home.count({
      where: {
        listId
      }
    });
    const pages: number = Math.ceil(count / limit);

    const homes = await this.home.findMany({
      where: {
        listId
      },
      orderBy: {
        createdAt: 'desc'
      },
      skip: page === 1 ? 0 : (page - 1) * limit,
      take: limit
    });
    return { homes, page, pages };
  }
}

export default new HomeRepository();
