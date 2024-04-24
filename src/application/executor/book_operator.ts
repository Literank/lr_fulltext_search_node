import { BookManager } from "../../domain/gateway";
import { Book } from "../../domain/model";

export class BookOperator {
  private bookManager: BookManager;

  constructor(b: BookManager) {
    this.bookManager = b;
  }

  async createBook(b: Book): Promise<string> {
    return await this.bookManager.indexBook(b);
  }
}
