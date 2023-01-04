import axios from 'axios';
import SearchPage from 'components/Search/SearchPage';

interface IProps {
  trending: boardData[];
}

export default function Search({ trending }: IProps) {
  return <SearchPage trending={trending} />;
}

export async function getServerSideProps() {
  let data;
  try {
    data = await axios
      .get(`${process.env.BASE_URL}/api/boards/trending`)
      .then((res) => res.data);
  } catch (error) {
    console.error('getServerSideProps search >> ', error);
  }
  return { props: { trending: data } };
}
