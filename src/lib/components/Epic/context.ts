import {createMountHistoryContext} from '../MountHistory';
import {useContext} from 'react';

export const epicMountHistoryContext =
  createMountHistoryContext('EpicMountHistoryContext');
export const useEpicMountHistory = () => useContext(epicMountHistoryContext);
