import React, {memo, useMemo, useState} from 'react';

import {
  GlobalStyleSheet,
  DeviceProvider,
  ConfigProvider,
  ThemeProviderConnected,
  createBrightLightTheme,
  createSpaceGrayTheme,
} from '../lib';
import {Inner} from './Inner';
import {NonIndexedHistory} from 'vkma-router';
import {Router} from './Router';

import {PanelsEnum, SchemeType, ThemesMap, ViewsEnum} from '../types';
import {AppTree, routingTree} from '../trees';

export const App = memo(() => {
  const [scheme] = useState<SchemeType>('bright_light');

  const themes = useMemo<ThemesMap>(() => ({
    client_light: createBrightLightTheme,
    bright_light: createBrightLightTheme,
    client_dark: createSpaceGrayTheme,
    space_gray: createSpaceGrayTheme,
    cosmic: createSpaceGrayTheme,
  }), []);
  const theme = useMemo(() => themes[scheme], [scheme, themes]);
  const initialHistory = useMemo<NonIndexedHistory<AppTree>>(() => {
    return [{
      view: ViewsEnum.Presentation,
      panel: PanelsEnum.Main,
      popup: null,
      query: {},
    }];
  }, []);

  return (
    <Router initialHistory={initialHistory} tree={routingTree}>
      <ConfigProvider automaticUpdate={true}>
        <DeviceProvider automaticUpdate={true}>
          <ThemeProviderConnected theme={theme}>
            <GlobalStyleSheet>
              <Inner/>
            </GlobalStyleSheet>
          </ThemeProviderConnected>
        </DeviceProvider>
      </ConfigProvider>
    </Router>
  );
});
