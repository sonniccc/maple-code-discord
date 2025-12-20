import z from "zod";

const CHANNEL_TYPE_MAP = {
  0: "TEXT",
  2: "VOICE",
  4: "CATEGORY",
} as const;

export type ChannelType =
  (typeof CHANNEL_TYPE_MAP)[keyof typeof CHANNEL_TYPE_MAP];

export function typeCodeToString(code: number): ChannelType | null {
  const entries = Object.entries(CHANNEL_TYPE_MAP);
  for (const entry of entries) {
    if (entry[0] == code.toString()) {
      return entry[1];
    }
  }
  return null;
}

export const channelSchema = z.object({
  id: z.string(),
  name: z.string().nullish(),
  type: z.number().transform((arg) => typeCodeToString(arg)),
  parent_id: z.string().nullish(),
  last_message_id: z.string().nullish(),
});

export type Channel = z.infer<typeof channelSchema>;

export const userSchema = z.object({
  id: z.string(),
  username: z.string(),
  discriminator: z.string(),
  global_name: z.string().nullish(),
});

export const emojiSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const reactionSchema = z.object({
  count: z.string(),
  emoji: emojiSchema.partial(),
});

export const messageSchema = z.object({
  id: z.string(),
  channel_id: z.string(),
  author: userSchema,
  content: z.string(),
});

export type Message = z.infer<typeof messageSchema>;
