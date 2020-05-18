import {getFontFamily} from '../utils';
import {
  ThemeCreator,
  buttonBrightLightTheme,
  formControlBrightLightTheme,
  inputBrightLightTheme,
  linkBrightLightTheme,
  selectBrightLightTheme,
  separatorBrightLightTheme,
} from '../components';

/**
 * Creates bright light theme
 * @param {ThemeCreatorOptions} options
 * @returns {{components: {Button: ButtonTheme}; global: {backgroundColor: string; text: {fontFamily: string; colors: {secondary: string; primary: string}}}}}
 */
export const createBrightLightTheme: ThemeCreator = options => ({
  components: {
    Button: buttonBrightLightTheme,
    FormControl: formControlBrightLightTheme,
    Input: inputBrightLightTheme,
    Link: linkBrightLightTheme,
    Select: selectBrightLightTheme,
    Separator: separatorBrightLightTheme,
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
