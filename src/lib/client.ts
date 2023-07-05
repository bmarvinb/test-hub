import { z } from "zod";
import { createZodFetcher } from "zod-fetch";

const fetchWithZod = createZodFetcher();

export function client(url: string, init?: RequestInit) {
  const options = {
    method: init?.body ? "POST" : "GET",
  }
  return fetchWithZod(z.void(), url, );
}
