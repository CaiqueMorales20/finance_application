import {create} from 'zustand';

import { IUserInfo } from './types/IUser';
import { IStore } from './types/IStore';
import { ICategory } from './types/ICategory';
import { Entry } from './types/IEntry';

export const useStore = create<IStore>((set) => ({
  userInfo: {id: 0, name: '', email: '', password: '', totalIncome: 0, totalOutcome: 0},
  setUserInfo: (newUserInfo: IUserInfo) => set({ userInfo: newUserInfo }),
  categories: [],
  setCategories: (categories: ICategory[]) => set({ categories: categories }),
  entries: [],
  setEntries: (entries: Entry[]) => set({entries: entries})
}));
