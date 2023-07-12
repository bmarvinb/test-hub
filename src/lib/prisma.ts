import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const globalAny: any = global;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!globalAny.prisma) {
    globalAny.prisma = new PrismaClient();
  }
  prisma = globalAny.prisma;
}

export default prisma;
export * from "@prisma/client";
