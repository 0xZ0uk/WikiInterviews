/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { createChunks, vectorStore } from "@/utils/vectorDb";

export const pineconeRouter = createTRPCRouter({
  upsert: publicProcedure
    .input(
      z.object({ content: z.string(), metadata: z.object({ url: z.string() }) })
    )
    .mutation(async ({ input }) => {
      const docs = await createChunks(input.content, input.metadata);

      await vectorStore.addDocuments(docs);

      return {
        page: input.content,
      };
    }),
});
