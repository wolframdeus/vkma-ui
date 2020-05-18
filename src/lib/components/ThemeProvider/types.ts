import {ReactNode, ReactNodeArray} from 'react';
import {OS} from '../../types';
import {ButtonTheme} from '../Button';
import {FormControlTheme} from '../FormControl';
import {InputTheme} from '../Input';
import {LinkTheme} from '../Link';
import {SelectTheme} from '../Select';
import {SeparatorTheme} from '../Separator';

/**
 * Description of theme
 */
export interface Theme {
  components: {
    Button: ButtonTheme;
    FormControl: FormControlTheme;
    Input: InputTheme;
    Link: LinkTheme;
    Select: SelectTheme;
    Separator: SeparatorTheme;
  };
  global: {
    backgroundColor: string;
    text: {
      fontFamily: string;
      colors: {
        primary: string;
        secondary: string;
      };
    };
  };
}

/**
 * Options passed to theme creator
 */
export interface ThemeCreatorOptions {
  /**
   * Current operating system
   */
  os: OS;
}

/**
 * Function that creates theme
 */
export type ThemeCreator = (options: ThemeCreatorOptions) => Theme;

/**
 * Allowed theme types
 */
export type ThemeType = Theme | ThemeCreator;


/**
 * Theme provider props
 */
export interface ThemeProviderProps {
  /**
   * Children React elements
   */
  children?: ReactNode | ReactNodeArray;

  /**
   * Current theme
   */
  theme: ThemeType;

  /**
   * Operating system
   */
  os: OS;
}

export type ThemeProviderConnectedProps = Omit<ThemeProviderProps, 'os'>;

/**
 * Full theme context
 */
export interface ThemeContext<T extends ThemeType = ThemeType> {
  /**
   * Current theme
   */
  theme: T;
}
