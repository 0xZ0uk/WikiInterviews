import { createTRPCRouter } from "@/server/api/trpc";
import { wikiRouter } from "@/server/api/routers/wiki";
import { pineconeRouter } from "./routers/pinecone";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  wiki: wikiRouter,
  pinecone: pineconeRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
