import { SlashCommandBuilder } from "discord.js";
import { CommandSpec } from "../command.js";
import { archiveCommandImpl } from "../discord-api.js";

export const archive: CommandSpec = {
  metadata: new SlashCommandBuilder()
    .setName("archive")
    .setDescription("Back up chat history of archived channels"),
  run: async (interaction) => {
    await interaction.reply("Back up in progress...");
    console.time("archive");
    const message = await archiveCommandImpl();
    console.timeEnd("archive");
    await interaction.followUp({ embeds: [message] });
  },
};
