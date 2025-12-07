import { SlashCommandBuilder } from "discord.js";
import { CommandSpec } from "../command.js";

export const ping: CommandSpec = {
  metadata: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!"),
  run: async (interaction) => {
    await interaction.reply("Pong!");
  },
};
