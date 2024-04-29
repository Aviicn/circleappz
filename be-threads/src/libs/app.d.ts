export interface IRegister {
  username: string;
  password: string;
  email: string;
  fullname: string;
}
export interface IUser {
  username: string;
  password: string;
  email: string;
  fullname: string;
  follower: string;

  following: string;
}

export type AuthMiddlewareData = {
  id: string;
};

export enum EStatus {
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
}

export interface IProfile {
  bio?: string;
  avatar?: string;
  cover?: string;
  userId?: number;
}

export interface IThread {
  id?: number;
  content?: string;
  image?: string;
  userId: number;
  threadId?: number;
}
