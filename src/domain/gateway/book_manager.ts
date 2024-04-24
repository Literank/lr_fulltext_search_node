import { Book } from "../model";

export interface BookManager {
  indexBook(b: Book): Promise<string>;
}
