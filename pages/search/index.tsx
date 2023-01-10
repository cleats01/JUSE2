import { getNewbies, getTrendings } from 'utils/axios';
import { User } from '@prisma/client';

import SearchPage from 'components/Search/SearchPage';

interface IProps {
  trending: boardData[];
  newbies: User[];
}

export default function Search({ trending, newbies }: IProps) {
  return <SearchPage trending={trending} newbies={newbies} />;
}

export async function getServerSideProps() {
  let trending = null;
  let newbies = null;
  try {
    trending = await getTrendings();
    newbies = await getNewbies();
  } catch (error) {
    console.error('getServerSideProps search >> ', error);
  }
  return { props: { trending, newbies } };
}
