import React, {memo, useMemo} from 'react';

import {ThemeProvider as MuiThemeProvider} from '@material-ui/styles';

import {themeContext} from './context';

import {ThemeContext, ThemeProviderProps} from './types';

const {Provider} = themeContext;

/**
 * Component which provides current theme context
 * @type {React.NamedExoticComponent<ThemeProviderProps>}
 */
export const ThemeProvider = memo(
  function ThemeProvider(props: ThemeProviderProps) {
    const {children, theme: themeOrCreator, os} = props;

    const theme = useMemo(() => {
      // If values is theme creator, call it to get theme
      if (typeof themeOrCreator === 'function') {
        return themeOrCreator({os});
      }

      // Otherwise return scheme
      return themeOrCreator;
    }, [themeOrCreator, os]);
    const context = useMemo<ThemeContext>(() => ({
      theme,
    }), [theme]);

    return (
      <Provider value={context}>
        <MuiThemeProvider theme={theme}>
          {children}
        </MuiThemeProvider>
      </Provider>
    );
  },
);
