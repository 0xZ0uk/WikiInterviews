/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { z } from "zod";
import TurndownService from "turndown";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import wiki from "wikipedia";

export const wikiRouter = createTRPCRouter({
  getPage: publicProcedure
    .input(z.object({ title: z.string() }))
    .query(async ({ input }) => {
      // Get the page from Wikipedia
      const page = await wiki.page(input.title);
      const pageSummary = await page.summary();
      const pageHtml = await page.html();

      // Convert the HTML to Markdown for improved LLM readability
      const turndownService = new TurndownService();
      const markdown = turndownService.turndown(pageHtml);

      return {
        page: {
          id: page.pageid,
          title: page.title,
          image: pageSummary.originalimage?.source,
          description: pageSummary.description,
          summary: pageSummary,
          extract: markdown,
        },
      };
    }),
});
