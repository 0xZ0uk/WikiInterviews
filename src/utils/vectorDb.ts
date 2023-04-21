/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { embedder } from "./embedder";
import { env } from "@/env.mjs";
import { MarkdownTextSplitter } from "langchain/text_splitter";
import { Document } from "langchain/document";
import { PineconeClient } from "@pinecone-database/pinecone";

const initializePinecone = async () => {
  const pinecone = new PineconeClient();
  await pinecone.init({
    apiKey: env.PINECONE_API_KEY,
    environment: env.PINECONE_ENVIRONMENT,
  });
  return pinecone;
};

const pinecone = await initializePinecone();

export const pineconeIndex = pinecone.Index(env.PINECONE_INDEX);

export const vectorStore = await PineconeStore.fromExistingIndex(embedder, {
  pineconeIndex,
});

export const createChunks = async (
  content: string,
  metadata: { url: string }
) => {
  const textSplitter = new MarkdownTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 20,
  });

  const chunks = await textSplitter.splitText(content);

  const docs = chunks.map((chunk) => {
    return new Document({
      metadata,
      pageContent: chunk,
    });
  });

  return docs;
};
