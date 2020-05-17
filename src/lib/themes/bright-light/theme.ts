import {buttonBrightLightTheme} from './button';
import {getFontFamily} from '../../utils';

import {ThemeCreator} from '../../types';

/**
 * Creates bright light theme
 * @param {ThemeCreatorOptions} options
 * @returns {{components: {Button: ButtonTheme}; global: {backgroundColor: string; text: {fontFamily: string; colors: {secondary: string; primary: string}}}}}
 */
export const createBrightLightTheme: ThemeCreator = options => ({
  components: {
    Button: buttonBrightLightTheme,
  },
  global: {
    backgroundColor: 'white',
    text: {
      fontFamily: getFontFamily(options.os),
      colors: {
        primary: 'black',
        secondary: '#818c99',
      },
    },
  },
});
