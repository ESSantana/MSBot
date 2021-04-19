enum EnumAuthType {
  BEARER = 'Bearer'
}

export const createTokenHeader = (tokenType: string, token: string) => {
  const authType = tokenType.toUpperCase()

  if (authType === 'BEARER') {
    return `${EnumAuthType[authType]} ${token}`;
  }
  return '';
}

export const scheduleJob = async (delay: number, func: Function) => {
  await new Promise(r => setTimeout(r, delay)).then(func());
}