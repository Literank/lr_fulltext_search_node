import { Client } from "@elastic/elasticsearch";

import { Book } from "../../domain/model";
import { BookManager } from "../../domain/gateway";

const INDEX_BOOK = "book_idx";

export class ElasticSearchEngine implements BookManager {
  private client: Client;
  private page_size: number;

  constructor(address: string, page_size: number) {
    this.page_size = page_size;
    this.client = new Client({ node: address });
  }

  async indexBook(b: Book): Promise<string> {
    const result = await this.client.index({
      index: INDEX_BOOK,
      document: b,
    });
    return result._id;
  }
}
