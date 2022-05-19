import { Home } from '@prisma/client';
import { ApiUrls } from '../constants/api-urls';
import { LoadHomeList } from '../constants/models/home-list.model';
import { AdditionForm } from '../store/types/addition-form.store';
import { ApiClient } from '../utils/api.client';

class HomeService {
  private apiClient = ApiClient;

  async createHome(data: AdditionForm, userId: string): Promise<Home> {
    const res = await this.apiClient.post(ApiUrls.homes(userId), data);
    return res.data;
  }

  async getRecentHomes(userId: string): Promise<Home[]> {
    const res = await this.apiClient.get(ApiUrls.homes(userId));
    return res.data;
  }

  async deleteHome(homeId: string): Promise<Home> {
    const res = await this.apiClient.delete(ApiUrls.deleteHome(homeId));
    return res.data;
  }

  async getPaginatedHomes(
    listId: string,
    page: number = 1,
    limit: number = 10
  ): Promise<Pick<LoadHomeList, 'limit' | 'homes' | 'pages' | 'page'>> {
    const res = await this.apiClient.get(
      ApiUrls.getPaginatedHomes(listId, page, limit)
    );
    return res.data;
  }
}

export default new HomeService();
