import React, {memo, useMemo, useState} from 'react';

import {
  GlobalStyleSheet,
  DeviceProvider,
  Button,
  ThemeProvider,
  createBrightLightTheme,
} from './lib';

import {SchemeType, ThemesMap} from './types';

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
    <DeviceProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyleSheet/>
        <Button onClick={() => setScheme('client_light')}>Light</Button>
        <Button onClick={() => setScheme('client_dark')}>Dark</Button>
      </ThemeProvider>
    </DeviceProvider>
  );
});
