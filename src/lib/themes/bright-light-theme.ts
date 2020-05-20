import {getFontFamily} from '../utils';
import {
  ThemeCreator,
  buttonBrightLightTheme,
  formControlBrightLightTheme,
  inputBrightLightTheme,
  linkBrightLightTheme,
  selectBrightLightTheme,
  separatorBrightLightTheme,
  viewTransitionBrightLightTheme,
  panelTransitionBrightLightTheme,
  panelBrightLightTheme, panelHeaderBrightLightTheme,
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
    Panel: panelBrightLightTheme,
    PanelHeader: panelHeaderBrightLightTheme,
    PanelTransition: panelTransitionBrightLightTheme,
    Select: selectBrightLightTheme,
    Separator: separatorBrightLightTheme,
    ViewTransition: viewTransitionBrightLightTheme
  },
  global: {
    backgroundColor: 'white',
    text: {
      fontFamily: getFontFamily(options.os),
      fontFamilyTT: '"TT Commons", -apple-system, Roboto, Helvetica Neue, Arial',
      colors: {
        primary: 'black',
        secondary: '#818c99',
      },
    },
  },
});
