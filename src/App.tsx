import React, {memo, useMemo, useState} from 'react';

import {
  GlobalStyleSheet,
  DeviceProvider,
  ConfigProvider,
  Link,
  Button,
  ThemeProviderConnected,
  Select,
  createBrightLightTheme,
  createSpaceGrayTheme,
} from './lib';

import {SchemeType, ThemesMap} from './types';

export const App = memo(() => {
  const [scheme] = useState<SchemeType>('client_dark');

  const themes = useMemo<ThemesMap>(() => ({
    client_light: createBrightLightTheme,
    bright_light: createBrightLightTheme,
    client_dark: createSpaceGrayTheme,
    space_gray: createSpaceGrayTheme,
    cosmic: createSpaceGrayTheme,
  }), []);
  const theme = useMemo(() => themes[scheme], [scheme, themes]);

  return (
    <ConfigProvider automaticUpdate={true}>
      <DeviceProvider automaticUpdate={true}>
        <ThemeProviderConnected theme={theme}>
          <GlobalStyleSheet/>
          <div>
            <Button variant={'primary'}>Button</Button>
          </div>
          <div>
            <Button variant={'secondary'}>Button</Button>
          </div>
          <div>
            <Link href={'https://m.vk.com'}>Link</Link>
          </div>
          <div>
            <Select placeholder={'Select option'}>
              <option>option 1</option>
              <option>option 2</option>
            </Select>
          </div>
        </ThemeProviderConnected>
      </DeviceProvider>
    </ConfigProvider>
  );
});
