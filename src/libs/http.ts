import { stringify } from "./json";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Credentials": true,
};

interface Response {
  statusCode: number;
  body: any;
  headers?: Record<string, any>;
  sendCORS?: boolean;
}

export const response = ({
  statusCode,
  body,
  headers,
  sendCORS = true,
}: Response) => ({
  statusCode,
  headers: sendCORS ? { ...CORS_HEADERS, ...headers } : headers,
  body: stringify(body),
});
