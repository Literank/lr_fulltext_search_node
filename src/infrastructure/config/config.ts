import { readFileSync } from "fs";

interface SearchConfig {
  address: string;
  index: string;
}

interface ApplicationConfig {
  port: number;
  page_size: number;
}

export interface Config {
  app: ApplicationConfig;
  search: SearchConfig;
}

export function parseConfig(filename: string): Config {
  return JSON.parse(readFileSync(filename, "utf-8"));
}
