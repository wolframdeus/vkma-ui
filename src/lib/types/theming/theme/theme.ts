import {Components} from './components';
import {Global} from './global';
import {OS} from '../../shared';

/**
 * Description of theme
 */
export interface Theme {
  components: Components;
  global: Global;
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
