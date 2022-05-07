import { ApiUrls } from '../constants/api-urls';
import { User } from '../constants/models/user.model';
import { ApiClient } from '../utils/api.client';

class ProfileService {
  async getProfile(): Promise<User> {
    const res = await ApiClient.get(ApiUrls.profile());
    return res.data;
  }
}

export default new ProfileService() as ProfileService;
