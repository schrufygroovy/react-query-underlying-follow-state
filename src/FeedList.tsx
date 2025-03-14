import {FeedItem, IFeedItem} from './FeedItem';
import {usePrefetchUnderlyingsFollowState} from './server-state/underlying-follow-state';

export function FeedList({feedItems}: {feedItems: IFeedItem[]}) {
  usePrefetchUnderlyingsFollowState(feedItems.map(item => item.isin));

  return (
    <div>
      <h1>Feed List</h1>
      <ul>
        {feedItems.map((item, index) => (
          <FeedItem key={index} {...item} />
        ))}
      </ul>
    </div>
  );
}
