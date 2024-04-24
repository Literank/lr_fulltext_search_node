import { WireHelper } from "./application";
import { InitApp } from "./adapter";
import { parseConfig } from "./infrastructure/config";

const CONFIG_FILENAME = "config.json";

const c = parseConfig(CONFIG_FILENAME);
const wireHelper = new WireHelper(c);
const app = InitApp(wireHelper);

app.listen(c.app.port, () => {
  console.log(`Running on port ${c.app.port}`);
});
