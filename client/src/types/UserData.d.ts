export interface userDataTypes {
  id?: number;
  email?: string;
  pseudo?: string;
  personalMessage?: string;
  currentPassword?: string;
  password?: string;
  passwordConfirm?: string;
}

export interface OutletContext {
  user: userData;
  setUser: React.Dispatch<React.SetStateAction<userData | null>>;
}

export interface userData {
  id?: number;
  email: string;
  pseudo: string;
  est_admin: number;
  photo_profil: string;
  message?: string;
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
  isAdmin: number;
  isLogged: boolean;
  setIsLogged: (value: boolean) => void;
  setIsAdmin: (value: number) => void;
  checkLogin: () => Promise<void>;
}

export interface UserPropsI extends userDataTypes {
  setUserData?: (userData: object | undefined) => void;
}
