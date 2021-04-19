import { StatusInfo } from '@type/commonTypes';
import { ChannelInfo } from '@type/twitchTypes';

export const updateStatusInfo = (currentStatus: StatusInfo, newStatus: ChannelInfo) => {

  let startStream = false;
  let changeGame = false;

  if (!currentStatus || (currentStatus.startAt !== '' && currentStatus.startAt !== newStatus.started_at)) {
    currentStatus = {
      displayName: newStatus.display_name,
      gameName: newStatus.game_name,
      isStreaming: newStatus.is_live,
      lastUpdate: Date.now(),
      startAt: newStatus.started_at
    };
    if (currentStatus.startAt !== '') {
      startStream = true;
    }
  } else if (currentStatus.gameName !== newStatus.game_name) {
    currentStatus = {
      ...currentStatus,
      gameName: newStatus.game_name,
      lastUpdate: Date.now()
    };
    changeGame = true;
  } else {
    currentStatus = {
      ...currentStatus,
      lastUpdate: Date.now()
    }
  }
  return {
    currentStatus,
    startStream,
    changeGame
  };
};

