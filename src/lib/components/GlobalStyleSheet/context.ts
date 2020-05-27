import {createContext, useContext} from 'react';
import {GlobalStyleSheetContext} from './types';

const noop = () => {
};

export const globalStyleSheetContext = createContext<GlobalStyleSheetContext>({
  releaseOverflowHide: noop,
  requestOverflowHide: noop,
  requestRestrictPointerEvents: noop,
  releaseRestrictPointerEvents: noop,
});
export const useGSS = () => useContext(globalStyleSheetContext);
