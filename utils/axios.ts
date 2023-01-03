import { User } from '@prisma/client';
import axios, { AxiosResponse } from 'axios';

// USERS
export const getUserById = (userId: string) =>
  axios
    .get(`${process.env.BASE_URL}/api/users?id=${userId}`)
    .then((res) => res.data);

// LIKES
export const getIsLiked = (userId: string) =>
  axios
    .get(`${process.env.BASE_URL}/api/likes?userId=${userId}`)
    .then((res) => res.data);

export const postLikes = (userId: string) =>
  axios.post(`${process.env.BASE_URL}/api/likes?userId=${userId}`);

// BOARDS
export const getBoardById = (boardId: string) =>
  axios
    .get(`${process.env.BASE_URL}/api/boards/${boardId}`)
    .then((res) => res.data);

export const getRelated = (boardId: string) =>
  axios
    .get(`${process.env.BASE_URL}/api/boards/related?boardId=${boardId}`)
    .then((res) => res.data);

// BOOKMARKS
export const postBookmarks = (boardId: string) =>
  axios.post(`/api/bookmarks?boardId=${boardId}`);

// APPLICATIONS
export const postApplications = (
  boardId: string,
  positionName: string,
  applicantId: string
) =>
  axios.post(
    `/api/applications?boardId=${boardId}&position=${positionName}&applicantId=${applicantId}`
  );

export const deleteApplications = (
  boardId: string,
  positionName: string,
  applicantId: string
) =>
  axios.delete(
    `/api/applications?boardId=${boardId}&position=${positionName}&applicantId=${applicantId}`
  );

export const patchApplications = (
  boardId: string,
  positionName: string,
  applicantId: string,
  where: string
) =>
  axios.patch(
    `/api/applications?boardId=${boardId}&position=${positionName}&applicantId=${applicantId}&to=${where}`
  );

//CHAT
export const postChattingRoom = (membersId: string[]) =>
  axios.post(`/api/chat`, { membersId });

export const getChatList = (userId: string) =>
  axios.get(`/api/chat?userId=${userId}`).then((res) => res.data);
