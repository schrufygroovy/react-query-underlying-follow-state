import {useQueryIsUnderlyingFollowed, useUnderlyingFollowStateMutation} from './server-state/underlying-follow-state';

export interface IFeedItem {
  title: string;
  isin: string;
}

export function FeedItem({title, isin}: IFeedItem) {
  const isUnderlyingFollowed = useQueryIsUnderlyingFollowed(isin);
  const underlyingFollowStateMutation = useUnderlyingFollowStateMutation(isin);
  return (
    <li>
      <div>{title}</div>
      <div>{isin}</div>
      <div>{isUnderlyingFollowed === undefined ? 'underlying follow state is uncertain' : isUnderlyingFollowed.toString()}</div>
      <button onClick={() => underlyingFollowStateMutation.mutate(true)}>Follow</button>
      <button onClick={() => underlyingFollowStateMutation.mutate(false)}>Unfollow</button>
    </li>
  );
}
