import {CSSTransitionProps} from 'react-transition-group/CSSTransition';
import {ReactElement} from 'react';

export interface MountTransitionProps
  extends Pick<CSSTransitionProps,
    'in' | 'classNames' | 'children' | 'onEntering' | 'onEntered'
    | 'onExiting' | 'onExited'> {
  /**
   * Should transition always stay in DOM tree
   * @default false
   */
  keepMounted?: boolean;

  /**
   * Should transition stay in DOM tree after being suspended
   * @default false
   */
  keepMountedAfterSuspend?: boolean;

  /**
   * Was transition mounted earlier
   * @default false
   */
  isMountedBefore?: boolean;

  /**
   * Transition duration
   */
  timeout: number | { appear?: number; enter?: number; exit?: number };

  /**
   * Child which supports className property
   */
  children?: ReactElement<{ className?: string }>;
}
