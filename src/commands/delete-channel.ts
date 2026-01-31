import { SlashCommandBuilder } from "discord.js";
import { CommandSpec } from "../command.js";
import { deleteChannel } from "../discord-api.js";
import { ca } from "zod/locales";

export const deleteChannelCommand: CommandSpec = {
  metadata: new SlashCommandBuilder()
    .setName("delete-channels")
    .setDescription("Delete one channel")
    .addStringOption((option) =>
      option
        .setName("channel-id")
        .setRequired(true)
        .setDescription("The ID of the channel to delete")),
  run: async (interaction) => {
    const channelId = interaction.options.getString("channel-id");
    if (!channelId) {
      await interaction.reply("No channel ID provided");
      return;
    }
    try{
      await deleteChannel(channelId);
      await interaction.reply("deleted channel " + channelId);
    }
    catch (error) {
      await interaction.reply("Error deleting channel: " + error);
    }
  },
};
