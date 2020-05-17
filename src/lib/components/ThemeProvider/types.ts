import {ReactNode, ReactNodeArray} from 'react';
import {ThemeType} from '../../types';

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
}

/**
 * Full theme context
 */
export interface ThemeContext<T extends ThemeType = ThemeType> {
  /**
   * Current theme
   */
  theme: T;
}
