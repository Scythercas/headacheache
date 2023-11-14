import { createRequire } from "module";
import {
  Client,
  Events,
  GatewayIntentBits,
  SlashCommandBuilder,
} from "discord.js";
const require = createRequire(import.meta.url);
require("dotenv").config({ debug: true });
const discordToken = process.env.DISCORD_TOKEN;
const serverId = process.env.SERVER_ID;

const headaches = [
  ["頭痛", "痛い"],
  ["まだ", "未定"],
  ["1枚", "UNO"],
  ["アメリカ", "渡米"],
  ["馬", "乗馬"],
  ["まず", "始めに"],
  ["2人", "ダブルピーク"],
  ["買わない", "エコ"],
  ["普段", "日常会話", "話す"],
  ["違和感", "感じる"],
  ["あらかじめ", "準備"],
];
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages,
  ],
});

client.once(Events.ClientReady, async (c) => {
  const data = [
    {
      name: "headache_add",
      description: "Add a headache to GAS",
    },
  ];
  await client.application.commands.set(data, serverId);
  console.log(`Ready! (${c.user.tag})`);
});

client.on(Events.MessageCreate, async (message) => {
  if (message.author.bot) return;
  if (message.guild.id != serverId) return;
  // if (message.channel.name != "アーカイブ") return;
  for (let i = 0; i < headaches.length; i++) {
    if (headaches[i].length == 2) {
      if (
        message.content.includes(headaches[i][0]) &&
        message.content.includes(headaches[i][1])
      ) {
        message.reply("頭痛が痛い！w");
      }
    } else if (headaches[i].length == 3) {
      if (
        message.content.includes(headaches[i][0]) &&
        message.content.includes(headaches[i][1]) &&
        message.content.includes(headaches[i][2])
      ) {
        message.reply("頭の頭痛が痛い！w");
      }
    }
  }
  console.log(message.content);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isCommand()) {
    return;
  }
  if (interaction.commandName === "headache_add") {
    console.log("GASにデータ送信しようとしています");
    await interaction.reply("GASに送信しようとしています");
  }
});
client.login(discordToken);
