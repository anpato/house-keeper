import { HomeList } from '@prisma/client';
import { ApiUrls } from '../constants/api-urls';
import { LoadHomeList } from '../constants/models/home-list.model';
import { ApiClient } from '../utils/api.client';

class ListService {
  private apiClient = ApiClient;
  async createList(userId: string, name: string): Promise<HomeList> {
    const res = await this.apiClient.post(ApiUrls.lists(userId), { name });
    return res.data;
  }

  async getLists(userId: string): Promise<HomeList[]> {
    const res = await this.apiClient.get(ApiUrls.lists(userId));
    return res.data;
  }

  async getListNames(userId: string): Promise<Pick<HomeList, 'id' | 'name'>[]> {
    const res = await this.apiClient.get(ApiUrls.listNames(userId));
    return res.data;
  }

  async deleteList(listId: string): Promise<{ listId: string }> {
    const res = await this.apiClient.delete(ApiUrls.deleteList(listId));
    return { listId };
  }

  async getList(listId: string): Promise<LoadHomeList> {
    const res = await this.apiClient.get(ApiUrls.getList(listId));
    return res.data;
  }
}

export default new ListService();
