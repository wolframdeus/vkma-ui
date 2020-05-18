import {createContext, useContext} from 'react';
import {createBrightLightTheme} from '../../themes';

import {Theme, ThemeContext} from './types';

export const themeContext = createContext<ThemeContext>({
  theme: createBrightLightTheme,
});

export const useTheme = <T extends Theme = Theme>(): ThemeContext<T> => {
  return useContext(themeContext) as ThemeContext<T>;
};

themeContext.displayName = 'ThemeContext';
