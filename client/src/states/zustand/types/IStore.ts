import { ICategory } from "./ICategory";
import { Entry } from "./IEntry";
import { IUserInfo } from "./IUser";

interface IStore {
  userInfo: IUserInfo;
  setUserInfo: (newUserInfo: IUserInfo) => void
  categories: ICategory[]
  setCategories: (categories: ICategory[]) => void
  entries: Entry[]
  setEntries: (entries: Entry[]) => void
};

export type {IStore}