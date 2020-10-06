import { FacebookConfig } from '@config/index';
import axios, { AxiosInstance } from 'axios';

class GetConfiguredAgent {
  public execute(): AxiosInstance {
    return axios.create({
      baseURL: `${FacebookConfig.baseURL}`,
    });
  }
}

export default GetConfiguredAgent;
