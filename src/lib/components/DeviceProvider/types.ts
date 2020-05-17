import {Insets, OS} from '../../types';
import {ReactNode, ReactNodeArray} from 'react';

export interface DeviceProviderProps {
  /**
   * Children React elements
   */
  children?: ReactNode | ReactNodeArray;

  /**
   * Current operating system. If not passed, will be taken from browser's
   * navigator.userAgent
   */
  os?: OS;

  /**
   * Initial device insets. If not passed, <style> deriving device insets
   * will be appended to head and removed
   */
  insets?: Insets;

  /**
   * Current device insets. If not passed, takes insets
   */
  currentInsets?: Insets;

  /**
   * Forces device provider to refresh himself listening to bridge events.
   * NOTE: Correct work is not guaranteed, watch:
   * https://github.com/VKCOM/vk-bridge/issues/109
   */
  automaticUpdate?: boolean;
}

export interface DeviceContext {
  /**
   * Device operating system
   */
  os: OS;

  /**
   * Initial device insets. Not changing during application lifetime
   */
  insets: Insets;

  /**
   * Current device insets, changing during application lifetime. For example,
   * when virtual keyboard is being opened
   */
  currentInsets: Insets;
}
