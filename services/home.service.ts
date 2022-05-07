import { Home } from '@prisma/client';
import { ApiUrls } from '../constants/api-urls';
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
}

export default new HomeService();
