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
