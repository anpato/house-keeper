export class ApiUrls {
  static profile(): string {
    return `/api/profile`;
  }

  static lists(userId: string): string {
    return `/api/lists?user=${userId}`;
  }

  static listNames(userId: string): string {
    return `/api/lists/selection?user=${userId}`;
  }

  static homes(userId: string): string {
    return `/api/homes?user=${userId}`;
  }
  static deleteList(listId: string): string {
    return `/api/lists/remove?list=${listId}`;
  }

  static deleteHome(homeId: string): string {
    return `/api/homes?home=${homeId}`;
  }

  static getList(listId: string, page: number = 1, limit: number = 10): string {
    return `/api/lists/view/${listId}?page=${page}&limit=${limit}`;
  }

  static getPaginatedHomes(
    listId: string,
    page: number = 1,
    limit: number = 10
  ): string {
    return `/api/homes/list/${listId}?page=${page}&limit=${limit}`;
  }
}
