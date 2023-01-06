import styled from 'styled-components';
import { useRouter } from 'next/router';
import { patchBoard, postBoard } from 'utils/axios';

import { AngleLeftIcon } from 'components/Common/Icons';

interface IProps {
  formData: boardFormData;
}

export default function NavbarNew(props: IProps) {
  const router = useRouter();
  const { formData } = props;

  const isEditPage = router.pathname.includes('edit');

  const handleSubmit = () => {
    const { period, application, title, content } = formData;
    if (!period) {
      alert('예상 진행 기간을 선택해주세요.');
    } else if (
      !application.at(-1)?.position ||
      application.filter((obj) => obj.count !== 0).length === 0
    ) {
      alert('모집 포지션과 인원 수를 확인해주세요.');
    } else if (!title) {
      alert('제목을 입력해주세요.');
    } else if (!content) {
      alert('본문을 입력해주세요.');
    } else {
      if (isEditPage) {
        patchBoard(router.query.boardId as string, formData).then(() => {
          router.back();
        });
      } else {
        postBoard(formData).then(() => {
          router.push('/');
        });
      }
    }
  };

  return (
    <NavLayout>
      <AngleLeftIcon onClick={router.back} />
      <MidSpan>{isEditPage ? '게시글 수정' : '모집 글쓰기'}</MidSpan>
      <button onClick={handleSubmit}>완료</button>
    </NavLayout>
  );
}

const NavLayout = styled.nav`
  position: sticky;
  max-width: 480px;
  height: 55px;
  left: 0;
  right: 0;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey1};
  background-color: #fff;
  z-index: 2;
`;

const MidSpan = styled.span`
  font-size: 16px;
`;
