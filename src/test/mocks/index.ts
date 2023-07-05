import { IS_BROWSER } from "@/config/constants";

export * from "./handlers";

export const initializeMocks = () => {
  if (!IS_BROWSER) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { server } = require("./server");
    server.listen();
  } else {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { worker } = require("./browser");
    worker.start();
  }
};
