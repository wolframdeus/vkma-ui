import {createContext, useContext} from 'react';

import {ConfigContext} from './types';

export const configContext = createContext<ConfigContext>({
  config: {
    app: 'vkclient',
    appId: '',
    appearance: 'light',
    scheme: 'client_light',
    insets: {top: 0, bottom: 0, left: 0, right: 0},
    viewportHeight: 0,
    viewportWidth: 0,
  },
  launchParams: {
    accessTokenSettings: [],
    appId: 0,
    areNotificationsEnabled: false,
    isAppUser: false,
    isFavorite: false,
    language: 'ru',
    platform: 'desktop_web',
    ref: 'other',
    userId: 0,
    groupId: null,
    viewerGroupRole: null,
    sign: '',
  },
});
export const useConfig = () => useContext(configContext);

configContext.displayName = 'ConfigContext';
