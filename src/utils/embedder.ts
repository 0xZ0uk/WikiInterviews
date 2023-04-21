/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { env } from "@/env.mjs";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";

export const embedder = new OpenAIEmbeddings({
  modelName: "text-embedding-ada-002",
  openAIApiKey: env.OPENAI_API_KEY,
  maxConcurrency: 5,
});
