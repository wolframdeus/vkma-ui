import {createContext, useContext} from 'react';
import {OSProviderContext} from './types';
import {OS} from '../../lib/types';

export const osProviderContext = createContext<OSProviderContext>({
  os: OS.IOS,
  setOS: () => {
  },
});

export const useOSProvider = () => useContext(osProviderContext);
