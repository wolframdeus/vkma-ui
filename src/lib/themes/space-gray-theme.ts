import {getFontFamily} from '../utils';
import {
  ThemeCreator,
  buttonSpaceGrayTheme,
  formControlSpaceGrayTheme,
  inputSpaceGrayTheme,
  linkSpaceGrayTheme,
  selectSpaceGrayTheme,
  separatorSpaceGrayTheme,
  viewTransitionSpaceGrayTheme,
  panelTransitionSpaceGrayTheme,
  panelSpaceGrayTheme, panelHeaderSpaceGrayTheme,
} from '../components';

/**
 * Creates space gray theme
 * @param {ThemeCreatorOptions} options
 * @returns {{components: {Button: ButtonTheme}; global: {backgroundColor: string; text: {fontFamily: string; colors: {secondary: string; primary: string}}}}}
 */
export const createSpaceGrayTheme: ThemeCreator = options => ({
  components: {
    Button: buttonSpaceGrayTheme,
    FormControl: formControlSpaceGrayTheme,
    Input: inputSpaceGrayTheme,
    Link: linkSpaceGrayTheme,
    Panel: panelSpaceGrayTheme,
    PanelHeader: panelHeaderSpaceGrayTheme,
    PanelTransition: panelTransitionSpaceGrayTheme,
    Select: selectSpaceGrayTheme,
    Separator: separatorSpaceGrayTheme,
    ViewTransition: viewTransitionSpaceGrayTheme,
  },
  global: {
    backgroundColor: '#19191a',
    text: {
      fontFamily: getFontFamily(options.os),
      fontFamilyTT: '"TT Commons", -apple-system, Roboto, Helvetica Neue, Arial',
      colors: {
        primary: '#e1e3e6',
        secondary: '#818c99',
      },
    },
  },
});
