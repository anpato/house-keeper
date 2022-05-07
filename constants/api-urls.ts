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
}
