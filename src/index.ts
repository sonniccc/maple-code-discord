import { createClient } from "./create-client.js";
import { deployCommands } from "./deploy-commands.js";
import { env } from "./env.js";

async function main() {
  await deployCommands();

  const client = await createClient();
  client.login(env.DISCORD_TOKEN);
}

await main();
