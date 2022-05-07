import { db } from '../db';

class ListRepository {
  private list = db.homeList;

  async getLists(userId: string) {
    const lists = await this.list.findMany({
      where: {
        userId
      },
      include: {
        _count: {
          select: {
            homes: true
          }
        }
      }
    });
    return lists;
  }

  async createList(userId: string, name: string) {
    const list = await this.list.create({
      data: {
        name,
        userId
      }
    });
    return list;
  }

  async getListNames(userId: string) {
    const lists = await this.list.findMany({
      where: {
        userId
      },
      select: {
        id: true,
        name: true
      }
    });
    return lists;
  }
}

export default new ListRepository();
