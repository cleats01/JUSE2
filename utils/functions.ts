import axios from 'axios';
import { patchUser, postUser } from './axios';

export const handleUserSubmit = async (
  imageURL: string,
  imageFile: File | null,
  nicknameCheck: string,
  data: {
    id?: string;
    email?: string;
    nickname: string;
    userTechStack: string[];
    image: string;
  }
) => {
  if (nicknameCheck !== '사용가능한 닉네임입니다.') {
    alert('닉네임을 확인해주세요.');
  } else {
    if (imageURL && imageFile) {
      // s3에 업로드
      await uploadImg(imageURL, imageFile);
    }
    // 회원가입
    if (data.email) {
      const postData = {
        email: data.email,
        nickname: data.nickname,
        userTechStack: data.userTechStack,
        image: data.image,
      };
      return await postUser(postData).then(() => {
        alert('회원가입에 성공하였습니다. 다시 로그인하여 주십시오.');
      });
    }
    // 회원정보수정
    if (data.id) {
      const patchData = {
        id: data.id,
        nickname: data.nickname,
        userTechStack: data.userTechStack,
        image: data.image,
      };
      return await patchUser(patchData).then(() => {
        alert('회원 정보가 수정되었습니다.');
      });
    }
  }
};

export const uploadImg = async (imageURL: string, imageFile: File) => {
  const imageBody = {
    name: imageURL,
    type: imageFile.type,
  };
  try {
    const signedUrl = await axios
      .post(`/api/media`, imageBody)
      .then((res) => res.data.url);
    await axios.put(signedUrl, imageFile, {
      headers: { 'Content-type': imageFile.type },
    });
  } catch (err) {
    console.log(err);
  }
};
