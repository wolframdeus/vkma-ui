import {SuspendablePublicProps, SuspendTransitionType} from '../Suspender';
import {ReactElement} from 'react';
import {ClassNameMap, CreateCSSProperties} from '@material-ui/styles';
import {EnterHandler, ExitHandler} from 'react-transition-group/Transition';
import {OS} from '../../types';
import {Theme} from '../ThemeProvider';

/**
 * Initial CSS transition phase types
 */
export type SuspendTransitionStartPhaseType = 'enter' | 'exit';

/**
 * Function returned by handlers generator
 */
type CreateTransitionPhaseStyles = (
  options: { os: OS; transitionType: SuspendTransitionType },
) => CreateCSSProperties;

/**
 * Function which generates transition phase handlers
 */
export type CreateTransitionPhaseGenerator = (
  theme: Theme,
  phase: SuspendTransitionStartPhaseType,
) => CreateTransitionPhaseStyles;

export interface SuspenderTransitionProps extends SuspendablePublicProps {
  /**
   * Children which can accept className property
   */
  children?: ReactElement<{ className?: string }>;

  /**
   * List of applied transition class names
   */
  classNames: ClassNameMap;

  /**
   * Transition duration in OS
   */
  iosDuration: number;

  /**
   * Transition duration on Android
   */
  androidDuration: number;

  /**
   * Means that component is currently active
   */
  in: boolean;

  /**
   * States if component was mounted earlier
   */
  isMountedBefore: boolean;

  /**
   * Current transition animation type
   */
  transitionType: SuspendTransitionType;

  /**
   * CSSTransition handlers
   */
  onEnter?: EnterHandler;
  onEntered?: EnterHandler;
  onExit?: ExitHandler;
  onExited?: ExitHandler;

  /**
   * Should transition be animated
   */
  animate?: boolean;
}

/**
 * Options required to create custom Transition component
 */
export interface CreateTransitionComponentOptions {
  /**
   * Creates CSS generator for start phase of transition
   */
  createStartPhaseTransitionGenerator: CreateTransitionPhaseGenerator;

  /**
   * Creates CSS generator for active phase of transition
   */
  createActivePhaseTransitionGenerator: CreateTransitionPhaseGenerator;

  /**
   * Component display name
   */
  displayName: string;

  /**
   * Duration of transition in IOS
   */
  iosDuration: number;

  /**
   * Duration of transition in Android
   */
  androidDuration: number;
}

/**
 * Context created by custom Transition component
 */
export interface CustomSuspenderTransitionContext
  extends SuspendablePublicProps {
  /**
   * States if component is currently transitioning
   */
  isTransitioning: boolean;
}

/**
 * Props interface of created custom Transition component
 */
export interface CustomSuspenderTransitionProps
  extends SuspendablePublicProps {
  /**
   * Transition id. Used to find it in suspender
   */
  id: string;

  children: ReactElement<{ className?: string }>;
}

export interface UseTransitionHandlersOptions {
  transitionType: SuspendTransitionType;
  onEnter?: EnterHandler;
  onEntered?: EnterHandler;
  onExit?: ExitHandler;
  onExited?: ExitHandler;
}
