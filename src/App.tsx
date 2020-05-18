import React, {memo, useMemo, useState} from 'react';

import {
  GlobalStyleSheet,
  DeviceProvider,
  Button,
  ThemeProviderConnected,
  createBrightLightTheme,
} from './lib';

import {SchemeType, ThemesMap} from './types';
import {ConfigProvider} from './lib/components/ConfigProvider';

export const App = memo(() => {
  const [scheme, setScheme] = useState<SchemeType>('client_light');

  const themes = useMemo<ThemesMap>(() => ({
    client_light: createBrightLightTheme,
    bright_light: createBrightLightTheme,
    client_dark: createBrightLightTheme,
    space_gray: createBrightLightTheme,
    cosmic: createBrightLightTheme,
  }), []);
  const theme = useMemo(() => themes[scheme], [scheme, themes]);

  return (
    <ConfigProvider automaticUpdate={true}>
      <DeviceProvider automaticUpdate={true}>
        <ThemeProviderConnected theme={theme}>
          <GlobalStyleSheet/>
          <Button onClick={() => setScheme('client_light')}>Light</Button>
          <Button onClick={() => setScheme('client_dark')}>Dark</Button>
        </ThemeProviderConnected>
      </DeviceProvider>
    </ConfigProvider>
  );
});
