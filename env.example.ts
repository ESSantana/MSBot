export const enviromentVariables: {
  discord: {
    bot_token: string;
    channel_id: string;
    startStreamMessage: string;
    changeGameMessage: string;
  };
  twitch: {
    base_url: string;
    client_id: string;
    client_secret: string;
    grant_type: string;
    oauth_url: string;
    twitch_base_link: string;
    channel_name: string;
  }
} = {
  discord: {
    bot_token: 'DISCORD_BOT_TOKEN',
    channel_id: 'CHANNEL_TO_PUSH_MESSAGE',
    startStreamMessage: 'MESSAGE_TEMPLATE',
    changeGameMessage: 'MESSAGE_TEMPLATE'
  },
  twitch: {
    base_url: 'https://api.twitch.tv',
    client_id: 'APP_CLIENT_ID',
    client_secret: 'APP_CLIENT_SECRET',
    grant_type: 'GRANT_TYPE',
    oauth_url: 'https://id.twitch.tv',  
    twitch_base_link: 'https://www.twitch.tv/',
    channel_name: 'BROADCAST_LOGIN_NAME'
  }
}