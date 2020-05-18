import {ReactNode, ReactNodeArray} from 'react';
import {OS, ThemeType} from '../../types';

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
