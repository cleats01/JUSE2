interface boardData {
  id: string;
  type: string;
  place: string;
  title: string;
  techStack: string[];
  application: position[];
  bookmark: number;
  chat: number;
  isClosed: boolean;
}

interface myBoardsData {
  myList: boardData[];
  applyList: boardData[];
  bookmarkList: boardData[];
  acceptedList: boardData[];
}

interface IRoom {
  id: string;
  chat: { username: string; message: string; createdAt: Date }[];
  membersId: string[];
  membersData: { id: string; image: string; nickname: string }[];
  boardId: string[];
}

interface IUserSimple {
  id: String;
  image: String;
  nickname: String;
}

interface IMessage {
  message: string;
  username: string;
}
