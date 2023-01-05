import axios from 'axios';
import { GetServerSidePropsContext } from 'next';
import { dehydrate, DehydratedState, QueryClient } from 'react-query';
import { getIsLiked, getUserById } from 'utils/axios';

import OtherUserPage from 'components/User/OtherUserPage';

interface IProps {
  dehydratedState: DehydratedState;
}

export default function UserEdit({ dehydratedState }: IProps) {
  return <OtherUserPage dehydratedState={dehydratedState} />;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  let { cookie } = context.req.headers;
  cookie = cookie ? cookie : '';
  axios.defaults.headers.Cookie = cookie;
  const queryClient = new QueryClient();
  const { userId } = context.query;
  try {
    await queryClient.prefetchQuery('user', () =>
      getUserById(userId as string)
    );
    await queryClient.prefetchQuery('isLiked', () =>
      getIsLiked(userId as string)
    );
  } finally {
    axios.defaults.headers.Cookie = '';
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
