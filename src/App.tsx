import React from 'react';
import './App.css';
import {FeedList} from './FeedList';
import {IFeedItem} from './FeedItem';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const queryClient = new QueryClient();

const feedItem1: IFeedItem = {
  title: 'hui',
  isin: 'DE000A0X7541',
};
const feedItem2: IFeedItem = {
  title: 'hui',
  isin: 'DE000A0X7542',
};
const feedItem3: IFeedItem = {
  title: 'hui2',
  isin: 'DE000A0X7541',
};
const feedItem4: IFeedItem = {
  title: 'hui2',
  isin: 'DE000A0X7541',
};
const feedItem5: IFeedItem = {
  title: 'hui2',
  isin: 'DE000A0X7543',
};
const feedItem6: IFeedItem = {
  title: 'neu',
  isin: 'DE000A0X7546',
};
const feedItem7: IFeedItem = {
  title: 'neu',
  isin: 'DE000A0X7547',
};
const feedItem8: IFeedItem = {
  title: 'neu',
  isin: 'DE000A0X7548',
};

function App() {
  const invalidateCache = () => {
    queryClient.invalidateQueries({
      queryKey: ['is-underlying-followed', 'DE000A0X7543'],
    });
  };
  const [items, setItems] = React.useState([feedItem1, feedItem2, feedItem3]);
  const [items2, setItems2] = React.useState<IFeedItem[]>([]);

  return (
    <QueryClientProvider client={queryClient}>
      <FeedList feedItems={items} />
      <button onClick={() => setItems(currentItems => [...currentItems, feedItem5])}>add DE000A0X7543</button>
      <button onClick={() => setItems(currentItems => [...currentItems, feedItem4])}>add DE000A0X7541</button>
      <button onClick={invalidateCache}>invalidate cache for DE000A0X7543</button>
      <button onClick={() => setItems2([feedItem1, feedItem2, feedItem3, feedItem6, feedItem7, feedItem8, feedItem6])}>Add second items list</button>
      <FeedList feedItems={items2} />
    </QueryClientProvider>
  );
}

export default App;
