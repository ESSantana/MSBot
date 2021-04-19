import { getInstance } from '@bot/httpRequest';
import { enviromentVariables as env } from '../env';
import { createTokenHeader, scheduleJob } from '@global/utils';
import { getToken as getTokenService, getChannelInfo } from '@services/twitchService';
import { AuthorizationCredentialsRequest, AuthorizationCredentialsResponse } from '@type/twitchTypes';
import { StatusInfo } from '@type/commonTypes';
import { updateStatusInfo } from '@handles/twitchHandle';
import { notifyDiscord } from '@services/discordService';

let statusInfo: StatusInfo;
let tokenInfo: AuthorizationCredentialsResponse;

const httpClient = getInstance();

const authParams: AuthorizationCredentialsRequest = {
  ClientId: env.twitch.client_id,
  ClientSecret: env.twitch.client_secret,
  GrantType: env.twitch.grant_type
};

const refreshToken = async () => {

  if (tokenInfo.AccessToken !== '') {
    const tokenValid = tokenInfo.ExpiresIn > Date.now();
    if (!tokenValid) {
      console.log('Refreshing token...');
      tokenInfo = await getTokenService(authParams);
    }
  }

  return tokenInfo
}

const getInfo = async () => {

  await refreshToken();
  const result = await getChannelInfo(httpClient, authParams.ClientId, createTokenHeader(tokenInfo.TokenType, tokenInfo.AccessToken));

  if (!result) return;

  const { currentStatus, startStream, changeGame } = updateStatusInfo(statusInfo, result);
  statusInfo = currentStatus;

  if (startStream || changeGame) {
    console.log('Notifying discord...');
    await notifyDiscord(startStream, changeGame, statusInfo.gameName);
  }
};

(async function main() {
  console.log('Generate token...');
  tokenInfo = await getTokenService(authParams);
  while (true) {
    console.log('New job schedule!');
    await scheduleJob(300000, getInfo);
  }
})();
