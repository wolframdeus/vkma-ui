import {createMountHistoryContext} from '../MountHistory';
import {useContext} from 'react';

export const viewMountHistoryContext =
  createMountHistoryContext('ViewMountHistoryContext');
export const useViewMountHistory = () => useContext(viewMountHistoryContext);
