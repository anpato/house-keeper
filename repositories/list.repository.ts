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

  async getPaginatedList(userId: string, page: number, limit: number) {
    const count = await this.list.count({
      where: {
        userId
      }
    });
    const pages: number = page === 1 ? 0 : Math.ceil(count / limit);
    const lists = await this.list.findMany({
      where: {
        userId
      },
      include: {
        homes: true
      },
      take: limit,
      skip: page === 1 ? 0 : page * limit,
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
    return { lists, page, pages };
  }

  async getList(listId: string) {
    const list = await this.list.findUnique({
      where: {
        id: listId
      },
      include: {
        homes: true
      }
    });

    return list;
  }
}

export default new ListRepository();
