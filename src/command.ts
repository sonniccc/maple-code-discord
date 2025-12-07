import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export type CommandSpec = {
  metadata: SlashCommandBuilder;
  run: (interaction: ChatInputCommandInteraction) => Promise<void>;
};
