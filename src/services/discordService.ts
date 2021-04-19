import { Client, TextChannel } from 'discord.js';
import { enviromentVariables as env } from '../enviromentVariables';

const client = new Client();

export const notifyDiscord = async (startStream: boolean, changeGame: boolean, topic: string) => {

  await client.login(env.discord.bot_token);
  const channel = await client.channels.fetch(env.discord.channel_id) as TextChannel;

  let message = '';
  if (startStream) {
    message = env.discord.changeGameMessage;
  } else if (changeGame) {
    message = env.discord.changeGameMessage;
  }

  message = message.replace('{0}', topic).replace('{1}', env.twitch.twitch_base_link + env.twitch.channel_name);

  const sendResult = await channel.send(message);

  if (sendResult) {
    console.log(`%c${new Date()} - Discord notificado com sucesso!`, 'color: red;');
  } else {
    console.log(`%c${new Date()} - Erro ao notificar o discord!`, 'color: green;');
  }
}