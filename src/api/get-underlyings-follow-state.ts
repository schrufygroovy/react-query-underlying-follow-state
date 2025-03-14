export type TUnderlyingWatchlistStateData = {isin: string; canBeFollowed: boolean; isFollowed: boolean};

const isFollowedMap: Record<string, boolean> = {
  DE000A0X7541: true,
};

export const getUnderlyingsFollowState = (isins: string[]): Promise<TUnderlyingWatchlistStateData[]> => {
  return new Promise(res => {
    setTimeout(() => {
      console.log('API Request | returning get', isins);
      res(
        isins.map(isin => {
          const result: TUnderlyingWatchlistStateData = {
            isin,
            canBeFollowed: true,
            isFollowed: isFollowedMap[isin] ?? false,
          };
          return result;
        }),
      );
    }, 1000);
  });
};

export const followUnderlying = (isin: string): Promise<void> => {
  return new Promise(res => {
    setTimeout(() => {
      console.log('API Request | follow', isin);
      isFollowedMap[isin] = true;
      res();
    }, 1000);
  });
};

export const unfollowUnderlying = (isin: string): Promise<void> => {
  return new Promise(res => {
    setTimeout(() => {
      console.log('API Request | unfollow', isin);
      isFollowedMap[isin] = false;
      res();
    }, 1000);
  });
};
