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
