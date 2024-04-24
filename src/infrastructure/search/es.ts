import { Client } from "@elastic/elasticsearch";

import { Book } from "../../domain/model";
import { BookManager } from "../../domain/gateway";

export class ElasticSearchEngine implements BookManager {
  private client: Client;
  private index: string;
  private page_size: number;

  constructor(address: string, index: string, page_size: number) {
    this.index = index;
    this.page_size = page_size;
    this.client = new Client({ node: address });
  }

  async indexBook(b: Book): Promise<string> {
    const result = await this.client.index({
      index: this.index,
      document: b,
    });
    return result._id;
  }

  async searchBooks(q: string): Promise<Book[]> {
    const result = await this.client.search({
      index: this.index,
      query: {
        multi_match: {
          query: q,
          fields: ["title", "author", "content"],
        },
      },
      explain: true,
    });
    return result.hits.hits.map((hit) => hit._source as Book);
  }
}
