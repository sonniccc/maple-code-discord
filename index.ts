import dotenv from "dotenv";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Require the necessary discord.js classes
import { Client, Collection, Events, GatewayIntentBits } from "discord.js";
dotenv.config();
const token = process.env.DISCORD_TOKEN;

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.
client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

// @ts-expect-error
client.commands = new Collection();

const foldersPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(foldersPath);

for (const commandFile of commandFiles) {
  const filePath = path.join(foldersPath, commandFile);
  const command = await import(filePath);
  // Set a new item in the Collection with the key as the command name and the value as the exported module
  if ("data" in command && "execute" in command) {
    // @ts-expect-error
    client.commands.set(command.data.name, command);
  } else {
    console.log(
      `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
    );
  }
}

client.on(Events.InteractionCreate, (interaction) => {
  console.log(interaction);
});

// Log in to Discord with your client's token
client.login(token);
