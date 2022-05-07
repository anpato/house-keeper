import { HomeList } from '@prisma/client';
import { ApiUrls } from '../constants/api-urls';
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
}

export default new ListService();
