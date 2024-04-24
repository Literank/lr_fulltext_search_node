import { Config } from "../infrastructure/config";
import { BookManager } from "../domain/gateway";
import { ElasticSearchEngine } from "../infrastructure/search";

// WireHelper is the helper for dependency injection
export class WireHelper {
  private engine: ElasticSearchEngine;

  constructor(c: Config) {
    this.engine = new ElasticSearchEngine(
      c.search.address,
      c.search.index,
      c.app.page_size
    );
  }

  bookManager(): BookManager {
    return this.engine;
  }
}
