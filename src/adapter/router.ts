import express, { Request, Response } from "express";

import { Book } from "../domain/model";
import { BookOperator } from "../application/executor";
import { WireHelper } from "../application";

class RestHandler {
  private bookOperator: BookOperator;

  constructor(bookOperator: BookOperator) {
    this.bookOperator = bookOperator;
  }

  // Create a new book
  public async createBook(req: Request, res: Response): Promise<void> {
    try {
      const bookID = await this.bookOperator.createBook(req.body as Book);
      res.status(201).json({ id: bookID });
    } catch (err) {
      console.error(`Failed to create: ${err}`);
      res.status(404).json({ error: "Failed to create" });
    }
  }
}

// Create router
function MakeRouter(wireHelper: WireHelper): express.Router {
  const restHandler = new RestHandler(
    new BookOperator(wireHelper.bookManager())
  );

  const router = express.Router();
  router.get("/", (req: Request, res: Response) => {
    res.json({ status: "ok" });
  });
  router.post("/books", restHandler.createBook.bind(restHandler));
  return router;
}

export function InitApp(wireHelper: WireHelper): express.Express {
  const app = express();

  // Middleware to parse JSON bodies
  app.use(express.json());

  const r = MakeRouter(wireHelper);
  app.use("", r);
  return app;
}
