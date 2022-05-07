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
      },
      take: 4,
      orderBy: [
        {
          homes: {
            _count: 'desc'
          }
        },
        {
          createdAt: 'desc'
        }
      ]
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
    return { ...list, _count: { homes: 0 } };
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

  async deleteList(listId: string) {
    const list = await this.list.delete({
      where: {
        id: listId
      }
    });
    return list;
  }
}

export default new ListRepository();
