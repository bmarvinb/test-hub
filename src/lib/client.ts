export interface ApiClient {
  get: <T = unknown>(endpoint: string) => Promise<T>;
  post: <T = void>(endpoint: string, body: BodyInit) => Promise<T>;
  patch: <T = void>(endpoint: string, body: BodyInit) => Promise<T>;
  delete: <T = void>(endpoint: string) => Promise<T>;
}

async function fetcher<T = unknown>(
  endpoint: string,
  { body, ...customConfig }: RequestInit = {}
): Promise<T> {
  const headers: HeadersInit = { "content-type": "application/json" };
  const config: RequestInit = {
    method: body ? "POST" : "GET",
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(endpoint, config);
  if (!response.ok) {
    const error = await response.json();
    return Promise.reject(error);
  }
  return await response.json();
}

export const client: ApiClient = {
  get: (endpoint) => fetcher(endpoint, { method: "GET" }),
  post: (endpoint, body) => fetcher(endpoint, { body, method: "POST" }),
  patch: (endpoint, body) => fetcher(endpoint, { body, method: "PATCH" }),
  delete: (endpoint) => fetcher(endpoint, { method: "DELETE" }),
};
