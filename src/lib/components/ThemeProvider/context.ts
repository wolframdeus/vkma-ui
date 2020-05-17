import {createContext, useContext} from 'react';

import {ThemeContext} from './types';
import {Theme} from '../../types';

import {createBrightLightTheme} from '../../themes/bright-light';

export const themeContext = createContext<ThemeContext>({
  theme: createBrightLightTheme,
});

export const useTheme = <T extends Theme = Theme>(): ThemeContext<T> => {
  return useContext(themeContext) as ThemeContext<T>;
};

themeContext.displayName = 'ThemeContext';
