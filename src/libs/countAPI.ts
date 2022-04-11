import axios from "axios";

import { env } from "../env";

export interface CountAPIInformation {
  namespace: string;
  key: string;
  value: number;
}

const api = axios.create({ baseURL: env.COUNT_API_URL });

export const getInfo = async (): Promise<CountAPIInformation> => {
  const response = await api.get<CountAPIInformation>(
    `/info/${env.COUNT_API_NAMESPACE}/${env.COUNT_API_INDEX}`,
  );

  const { namespace, key, value } = response.data;
  return { namespace, key, value };
};

export const hitCounter = async (): Promise<CountAPIInformation> => {
  const response = await api.get<{ value: number }>(
    `/hit/${env.COUNT_API_NAMESPACE}/${env.COUNT_API_INDEX}`,
  );

  return {
    namespace: env.COUNT_API_NAMESPACE,
    key: env.COUNT_API_INDEX,
    value: response.data.value,
  };
};
