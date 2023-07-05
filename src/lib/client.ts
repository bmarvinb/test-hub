export interface ApiClient {
  get: <T = unknown>(endpoint: string) => Promise<T>;
  post: <T = void>(endpoint: string, body: BodyInit) => Promise<T>;
  patch: <T = void>(endpoint: string, body: BodyInit) => Promise<T>;
  delete: <T = void>(endpoint: string) => Promise<T>;
}

export const client: ApiClient = {
  get: (endpoint) => fetcher(endpoint, { method: "GET" }),

  post: (endpoint: string, body: BodyInit) =>
    fetcher(endpoint, { body, method: "POST" }),

  patch: (endpoint: string, body: BodyInit) =>
    fetcher(endpoint, { body, method: "PATCH" }),

  delete: (endpoint: string) => fetcher(endpoint, { method: "DELETE" }),
};

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

  try {
    const response = await fetch(endpoint, config);
    if (!response.ok) {
      const error = await response.json();
      return Promise.reject(error);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
