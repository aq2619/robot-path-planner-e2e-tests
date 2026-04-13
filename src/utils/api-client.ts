import axios, { AxiosInstance } from 'axios';

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:1000/node-api/edge';

export class APIClient {
  private client: AxiosInstance;

  constructor(baseURL: string = API_BASE_URL) {
    this.client = axios.create({ baseURL, timeout: 10000 });
  }

  /** GET /health – System health check */
  async getHealth(): Promise<Record<string, unknown>> {
    const response = await this.client.get<Record<string, unknown>>('/health');
    return response.data;
  }

  /** GET /version – API version information */
  async getVersion(): Promise<Record<string, unknown>> {
    const response = await this.client.get<Record<string, unknown>>('/version');
    return response.data;
  }

  /** GET /missions – List queued/completed missions */
  async getMissions(): Promise<unknown[]> {
    const response = await this.client.get<unknown[]>('/missions');
    const missions = response.data;
    if (!Array.isArray(missions)) {
      throw new Error('Expected missions response to be an array');
    }
    return missions;
  }
}

