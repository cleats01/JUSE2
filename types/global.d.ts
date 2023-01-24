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
  createdAt: Date;
}

interface myBoardsData {
  myList: boardData[];
  applyList: boardData[];
  bookmarkList: boardData[];
  acceptedList: boardData[];
}

interface boardFormData {
  type: string;
  place: string;
  period: string;
  application: position[];
  title: string;
  content: string;
  authorId: string;
  techStack: string[];
}

interface IRoom {
  id: string;
  chat: IMessage[];
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
  userId: string;
  isRead?: boolean;
  createdAt?: Date;
}
