import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {followUnderlying, getUnderlyingsFollowState, unfollowUnderlying} from '../api/get-underlyings-follow-state';

export const usePrefetchUnderlyingsFollowState = (isins: string[]) => {
  const queryClient = useQueryClient();
  const uniqueIsins = Array.from(new Set(isins));
  const missingIsins = uniqueIsins.filter(isin => queryClient.getQueryData(['is-underlying-followed', isin]) === undefined && !queryClient.isFetching({queryKey: ['is-underlying-followed', isin]}));
  if (missingIsins.length > 0) {
    const promiseGetUnderlyingsFollowState = getUnderlyingsFollowState(missingIsins);
    missingIsins.forEach(isin => {
      queryClient.prefetchQuery({
        queryKey: ['is-underlying-followed', isin],
        queryFn: () => promiseGetUnderlyingsFollowState.then(response => response.find(item => item.isin === isin)?.isFollowed),
      });
    });
  }
};

export const useQueryIsUnderlyingFollowed = (isin: string): boolean | undefined => {
  const {data} = useQuery({
    queryKey: ['is-underlying-followed', isin],
    staleTime: Infinity,
    queryFn: () => getUnderlyingsFollowState([isin]).then(response => response.find(item => item.isin === isin)?.isFollowed),
  });
  return data as boolean | undefined;
};

export const useUnderlyingFollowStateMutation = (isin: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (follow: boolean) => (follow ? followUnderlying(isin) : unfollowUnderlying(isin)),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['is-underlying-followed', isin]});
    },
  });
};
