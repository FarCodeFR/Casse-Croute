export interface userDataTypes {
  id?: number;
  email?: string;
  pseudo?: string;
  personalMessage?: string;
  currentPassword?: string;
  password?: string;
  passwordConfirm?: string;
}

export interface userData {
  id?: number;
  email: string;
  pseudo: string;
  est_admin: string;
  photo_profil: string;
}

export type UserScrollI = {
  users: userData[];
  setSelectUser: (user: userData) => void;
  searchUser: string;
};

export interface DeleteUserProps {
  handleVisibility: () => void;
  selectUser: userData;
}

export interface AuthContextType {
  isLogged: boolean;
  checkLogin: () => Promise<void>;
  setIsLogged: (value: boolean) => void;
}

export interface UserPropsI extends userDataTypes {
  setUserData?: (userData: object | undefined) => void;
}
