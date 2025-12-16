export type Role = "admin" | "author";

export interface ILogin {
  email: string;
  password: string;
}

export interface IUser {
  id?: string;
  username: string;
  email: string;
  password: string;
  phone: string;
  role: Role;
  profile?: string | null;
  token?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IBlog {
  id?: string;
  authorId: string;
  blogTitle: string;
  blogDescription: string;
  blogCategory: string;
  thumbnail?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IComment {
  id?: string;
  blogId: string;
  authorId: string;
  commenterId: string;

  commenter_Name: string;
  commentor_message: string;
  commentor_Email: string;

  commentor_photo?: string | null;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICategory {
  id?: string;
  blogId: string;
  blogcategory: string;
  authorId: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface IBlogAuthor {
  id?: string;
  blogid: string;
  authorId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IStatusState {
  loading: boolean;
  error: string | null;
  success: string | null;
}

export interface IAdminSignup {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  profile: File | null;
}

export interface IAdminAuthResponse {
  message: string;
  user?: IUser;
  token?: string;
}
