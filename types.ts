
export interface Message {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export enum AppMode {
  CHAT = 'CHAT',
  QUIZ = 'QUIZ',
  HOMEWORK = 'HOMEWORK',
  GAME = 'GAME'
}

export interface TeacherProfile {
  name: string;
  school: string;
  grade: string;
  class: string;
  imageUrl: string;
}
