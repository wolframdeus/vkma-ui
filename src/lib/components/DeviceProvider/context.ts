import {createContext, useContext} from 'react';

import {DeviceContext} from './types';
import {OS} from '../../types';

export const deviceContext = createContext<DeviceContext>({
  os: OS.IOS,
  insets: {top: 0, left: 0, right: 0, bottom: 0},
  currentInsets: {top: 0, left: 0, right: 0, bottom: 0},
});
export const useDevice = () => useContext(deviceContext);

deviceContext.displayName = 'DeviceContext';
