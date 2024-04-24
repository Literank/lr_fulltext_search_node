import { Book } from "../model";

export interface BookManager {
  indexBook(b: Book): Promise<string>;
  searchBooks(q: string): Promise<Book[]>;
}
