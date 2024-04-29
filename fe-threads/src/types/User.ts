export type IUser = {
  id?: number;
  fullname?: string;
  username?: string;
  email?: string;
  image?: string;
  cover?: string;
  description?: string;
};

export type IUserRegister = {
  fullname: string;
  username: string;
  email: string;
  password: string;
};

export type IUserlogin = {
  username: string;
  password: string;
};

// export type IUserForget
