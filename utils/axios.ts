import axios from 'axios';

// BOARDS
export const getBoards = (query: string) =>
  axios
    .get(`${process.env.BASE_URL}/api/boards` + query)
    .then((res) => res.data);

export const getBoardsBySearch = (search: string) =>
  axios
    .get(`${process.env.BASE_URL}/api/boards?search=${search}`)
    .then((res) => res.data);

export const getBoardById = (boardId: string) =>
  axios
    .get(`${process.env.BASE_URL}/api/boards/${boardId}`)
    .then((res) => res.data);

export const getRelated = (boardId: string) =>
  axios
    .get(`${process.env.BASE_URL}/api/boards/related?boardId=${boardId}`)
    .then((res) => res.data);

export const postBoard = (data: boardFormData) =>
  axios.post(`${process.env.BASE_URL}/api/boards`, data);

export const patchBoardClose = (boardId: string, isClosed: boolean) =>
  axios.patch(
    `${process.env.BASE_URL}/api/boards/${boardId}?isClosed=${!isClosed}`
  );

export const patchBoard = (boardId: string, data: boardFormData) =>
  axios.patch(`${process.env.BASE_URL}/api/boards/${boardId}`, data);

export const deleteBoard = (boardId: string) =>
  axios.delete(`${process.env.BASE_URL}/api/boards/${boardId}`);

// USERS
export const getUserById = (userId: string) =>
  axios
    .get(`${process.env.BASE_URL}/api/users?id=${userId}`)
    .then((res) => res.data);

export const getUsersByIds = (userIds: string[]) =>
  axios
    .get(`${process.env.BASE_URL}/api/users?ids=${userIds}`)
    .then((res) => res.data);

export const getNickname = (nickname: string) =>
  axios
    .get(`${process.env.BASE_URL}/api/users?nickname=${nickname}`)
    .then((res) => res.data);

export const getNewbies = () =>
  axios
    .get(`${process.env.BASE_URL}/api/users/newbies`)
    .then((res) => res.data);

export const postUser = (data: {
  email: string;
  nickname: string;
  userTechStack: string[];
  image: string;
}) => axios.post(`${process.env.BASE_URL}/api/users`, data);

export const patchUser = (data: {
  id: string;
  nickname: string;
  userTechStack: string[];
  image: string;
}) => axios.patch(`${process.env.BASE_URL}/api/users`, data);

export const deleteUser = (userId: string) =>
  axios.delete(`${process.env.BASE_URL}/api/users?id=${userId}`);

// MY
export const getMyLists = (userId: string) =>
  axios
    .get(`${process.env.BASE_URL}/api/boards/my?id=${userId}`)
    .then((res) => res.data);

// LIKES
export const getIsLiked = (userId: string) =>
  axios
    .get(`${process.env.BASE_URL}/api/likes?userId=${userId}`)
    .then((res) => res.data);

export const postLikes = (userId: string) =>
  axios.post(`${process.env.BASE_URL}/api/likes?userId=${userId}`);

// BOOKMARKS
export const postBookmarks = (boardId: string) =>
  axios.post(`${process.env.BASE_URL}/api/bookmarks?boardId=${boardId}`);

// APPLICATIONS
export const postApplications = (
  boardId: string,
  positionName: string,
  applicantId: string
) =>
  axios.post(
    `${process.env.BASE_URL}/api/applications?boardId=${boardId}&position=${positionName}&applicantId=${applicantId}`
  );

export const deleteApplications = (
  boardId: string,
  positionName: string,
  applicantId: string
) =>
  axios.delete(
    `${process.env.BASE_URL}/api/applications?boardId=${boardId}&position=${positionName}&applicantId=${applicantId}`
  );

export const patchApplications = (
  boardId: string,
  positionName: string,
  applicantId: string,
  where: string
) =>
  axios.patch(
    `${process.env.BASE_URL}/api/applications?boardId=${boardId}&position=${positionName}&applicantId=${applicantId}&to=${where}`
  );

// CHAT
export const getChattingRoom = (chatId: string) =>
  axios
    .get(`${process.env.BASE_URL}/api/chat/${chatId}`)
    .then((res) => res.data);

export const postChattingRoom = (membersId: string[], boardId?: string) => {
  if (boardId) {
    return axios.post(`${process.env.BASE_URL}/api/chat?boardId=${boardId}`, {
      membersId,
    });
  }
  return axios.post(`${process.env.BASE_URL}/api/chat`, { membersId });
};

export const getChatList = (userId: string) =>
  axios
    .get(`${process.env.BASE_URL}/api/chat?userId=${userId}`)
    .then((res) => res.data);

export const getChatListByBoardId = (boardId: string) =>
  axios
    .get(`${process.env.BASE_URL}/api/chat?boardId=${boardId}`)
    .then((res) => res.data);

export const postMessage = (chatId: string, data: IMessage) =>
  axios.post(`${process.env.BASE_URL}/api/chat/${chatId}`, {
    data,
  });

// TRENDING
export const getTrendings = () =>
  axios
    .get(`${process.env.BASE_URL}/api/boards/trending`)
    .then((res) => res.data);

// REPORT
export const postReport = (data: { content: string }) =>
  axios.post(`${process.env.BASE_URL}/api/reports`, data);
