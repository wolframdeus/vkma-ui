import {createContext, useContext} from 'react';
import {createMountHistoryContext} from '../MountHistory';
import {PopupRootContextCore} from './types';

const noop = () => {
};

export const popupRootMountHistoryContext =
  createMountHistoryContext('PopupRootMountHistoryContext');
export const popupRootContext = createContext<PopupRootContextCore>({
  mountPopup: noop,
  unmountPopup: noop,
});
popupRootContext.displayName = 'PopupRootContext';

export const usePopupRoot = () => {
  const core = useContext(popupRootContext);
  const mountHistory = useContext(popupRootMountHistoryContext);

  return {...core, ...mountHistory};
};
