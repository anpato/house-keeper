import axios from 'axios';

class PreviewService {
  private client = axios.create({
    baseURL: 'https://hk-image-proxy.herokuapp.com'
  });

  async getLinkMeta(url: string) {
    const res = await this.client.post('/meta', { url });
    return res.data;
  }
}

export default new PreviewService();
