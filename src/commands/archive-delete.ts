import { SlashCommandBuilder } from "discord.js";
import { CommandSpec } from "../command.js";
import { deleteArchivedChannel, archiveCommandImpl } from "../discord-api.js";
import { ca } from "zod/locales";

// TODO: modify this command to archive and delete the backedup channels
export const deleteArchivedChannelsCommand: CommandSpec = {
  metadata: new SlashCommandBuilder()
    .setName("delete-channels")
    .setDescription("Delete all archived channels"),
  run: async (interaction) => {
    try{
      await archiveCommandImpl();
      await deleteArchivedChannel();
      await interaction.reply("deleted archived: channels");
    }
    catch (error: any) {
      await interaction.reply("Error deleting channel: " + error.toString());
    }
  },
};
