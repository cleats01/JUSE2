import axios from 'axios';
import { GetServerSidePropsContext } from 'next';
import { dehydrate, DehydratedState, QueryClient } from 'react-query';
import { getBoardById, getRelated } from 'utils/axios';

import BoardPage from 'components/Board/BoardPage';

interface IProps {
  dehydratedState: DehydratedState;
}

export default function Board(props: IProps) {
  return <BoardPage dehydratedState={props.dehydratedState} />;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  let { cookie } = context.req.headers;
  cookie = cookie ? cookie : '';
  axios.defaults.headers.Cookie = cookie;
  const queryClient = new QueryClient();
  const { boardId } = context.query;
  try {
    await queryClient.prefetchQuery('board', () =>
      getBoardById(boardId as string)
    );
    await queryClient.prefetchQuery('related', () =>
      getRelated(boardId as string)
    );
  } catch (error) {
    console.error('getServerSideProps board/:boardId >> ', error);
  } finally {
    axios.defaults.headers.Cookie = '';
  }

  return { props: { dehydratedState: dehydrate(queryClient) } };
}
