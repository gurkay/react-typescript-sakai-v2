import { User } from "./user";

export interface UserState {
    loading: boolean;
    users: Array<User>;
    error: string | undefined;
  }