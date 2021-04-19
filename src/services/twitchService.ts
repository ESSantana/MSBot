import { AxiosInstance, AxiosResponse } from "axios";
import { getInstance } from "@bot/httpRequest";
import { AuthorizationCredentialsRequest, AuthorizationCredentialsResponse, ChannelInfo } from "@type/twitchTypes";
import { enviromentVariables as env } from '../enviromentVariables';

export const getToken = async (parameters: AuthorizationCredentialsRequest) => {

  let auth: AuthorizationCredentialsResponse;

  return getInstance(env.twitch.oauth_url)
    .post(`oauth2/token?client_id=${parameters.ClientId}&client_secret=${parameters.ClientSecret}&grant_type=${parameters.GrantType}`)
    .then((response: AxiosResponse) => {
      auth = {
        AccessToken: response.data?.access_token,
        ExpiresIn: Date.now() + +response.data?.expires_in,
        TokenType: response.data?.token_type
      }
      return auth;
    })
    .catch(error => {
      throw {
        statusCode: error?.status,
        message: error?.message
      }
    });
}

export const getChannelInfo = async (httpClient: AxiosInstance, clientId: string, token: string) => {

  return httpClient
    .get(`helix/search/channels?query=${env.twitch.channel_name}`, {
      headers: {
        'client-id': clientId,
        'Authorization': token
      }
    })
    .then((response: AxiosResponse) => {
      const { data, pagination } = response.data;

      const result = (data as Array<ChannelInfo>)
        .find(x => x.broadcaster_login === env.twitch.channel_name)

      if (!result && pagination) {
        //TO_DO
      }

      return result;
    })
    .catch(error => {
      throw {
        statusCode: error?.status,
        message: error?.message
      }
    });
}