import { createContext, useContext } from 'react';
import type { PageData } from 'shared/index';

export const DataContext = createContext({} as PageData);
export const usePageData = () => {
  return useContext(DataContext);
};
