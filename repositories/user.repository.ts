import { User } from '../constants/models/user.model';
import { db } from '../db';

class UserRepository {
  private user = db.user;

  async createProfile(data: Pick<User, 'email' | 'name'>): Promise<User> {
    const hasProfile = await this.getUserProfile(data.email);

    if (hasProfile) {
      return hasProfile;
    }
    const profile = await this.user.create({ data });
    return profile;
  }

  async getProfile(email: string): Promise<User | null> {
    return await this.getUserProfile(email);
  }

  // Internal service use
  async getUserProfile(email: string): Promise<User | null> {
    const hasProfile = await this.user.findUnique({
      where: {
        email: email
      }
    });
    return hasProfile;
  }
}

export default new UserRepository();
