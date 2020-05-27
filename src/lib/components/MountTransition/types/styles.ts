import {CreateCSSProperties} from '@material-ui/styles';
import {OS} from '../../../types';
import {Theme} from '../../ThemeProvider';
import {EnterHandler, ExitHandler} from 'react-transition-group/Transition';

/**
 * Function returned by handlers generator
 */
export type TransitionPhaseStylesHandler = (
  options: { os: OS; transitionType: MountTransitionType },
) => CreateCSSProperties;

/**
 * Function which generates transition phase handlers
 */
export type TransitionPhaseGenerator = (
  theme: Theme,
  phase: MountTransitionStartPhaseType,
) => TransitionPhaseStylesHandler;

/**
 * Mount transition type
 */
export type MountTransitionType = 'main' | 'alternative';

/**
 * Initial CSS transition phase types
 */
export type MountTransitionStartPhaseType = 'enter' | 'exit';

export interface UseTransitionHandlersOptions {
  onEntering?: EnterHandler;
  onEntered?: EnterHandler;
  onExiting?: ExitHandler;
  onExited?: ExitHandler;
  setIsTransitioning(isTransitioning: boolean): void;
}
