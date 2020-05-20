import {createContext, useContext} from 'react';
import {GlobalStyleSheetContext} from './types';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {
};

export const globalStyleSheetContext = createContext<GlobalStyleSheetContext>({
  releaseOverflowHide: noop,
  requestOverflowHide: noop,
});
export const useGSS = () => useContext(globalStyleSheetContext);
