import {
  VIEW_TRANSITION_IOS_DURATION,
  VIEW_TRANSITION_ANDROID_DURATION,
  VIEW_TRANSITION_ANDROID_TOP,
  VIEW_TRANSITION_ANDROID_LEFT,
} from './constants';

import {CreateCSSProperties} from '@material-ui/styles';
import {OS} from '../../types';
import {Theme} from '../ThemeProvider';
import {
  TransitionPhaseGenerator,
  MountTransitionStartPhaseType,
  MountTransitionType,
} from '../MountTransition';

/**
 * Returns base transition CSS-properties for IOS
 * @returns {CreateCSSProperties}
 * @param theme
 * @param transitionType
 * @param phase
 */
function getIOSTransitionBaseCSS(
  theme: Theme,
  transitionType: MountTransitionType,
  phase: MountTransitionStartPhaseType,
): CreateCSSProperties {
  const isEnter = phase === 'enter';
  const isMain = transitionType === 'main';

  if (isMain) {
    return {
      position: 'relative',
      pointerEvents: 'none',

      '&:before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        transition: `${VIEW_TRANSITION_IOS_DURATION}ms `
          + (isEnter ? 'cubic-bezier(0, 0.69, 0.28, 0.99) ' : 'linear ')
          + 'background-color',
        backgroundColor: isEnter
          ? theme.components.ViewTransition.colors.suspender
          : 'transparent',
      },
    };
  }

  return {
    position: 'absolute',
    top: isEnter ? '100%' : 0,
    transform: 'translateY(0)',
    pointerEvents: 'none',
    transitionDuration: `${VIEW_TRANSITION_IOS_DURATION}ms`,
    transitionTimingFunction: 'cubic-bezier(0.47, 0.91, 0.43, 0.94)',
    transitionProperty: 'transform, opacity',
    zIndex: 2,
  };
}

/**
 * Returns base transition CSS-properties for Android
 * @param theme
 * @param transitionType
 * @param phase
 * @returns {CreateCSSProperties}
 */
function getAndroidTransitionBaseCSS(
  theme: Theme,
  transitionType: MountTransitionType,
  phase: MountTransitionStartPhaseType,
): CreateCSSProperties {
  const isEnter = phase === 'enter';
  const isMain = transitionType === 'main';

  if (isMain) {
    return {
      pointerEvents: 'none',
    };
  }

  return {
    position: 'absolute',
    top: 0,
    left: 0,
    transform: `translate(${
      isEnter ? (isMain ? 0 : VIEW_TRANSITION_ANDROID_LEFT) : 0
    }px, ${
      isEnter ? (isMain ? 0 : VIEW_TRANSITION_ANDROID_TOP) : 0
    }px)`,
    opacity: isEnter ? 0 : 1,
    pointerEvents: 'none',
    transitionDuration: `${VIEW_TRANSITION_ANDROID_DURATION}ms`,
    transitionTimingFunction: 'cubic-bezier(0.47, 0.91, 0.64, 0.98)',
    transitionProperty: 'transform, opacity',
  };
}

/**
 * Creates handler which returns base transition CSS-properties
 * @param {Theme} theme
 * @param {MountTransitionStartPhaseType} phase
 * @returns {(options: T) => CreateCSSProperties<{}>}
 */
export const createViewStartPhaseTransitionGenerator: TransitionPhaseGenerator =
  (theme, phase) => ({os, transitionType}) => os === OS.IOS
    ? getIOSTransitionBaseCSS(theme, transitionType, phase)
    : getAndroidTransitionBaseCSS(theme, transitionType, phase);

/**
 * Returns CSS for active phase of IOS transition
 * @param {Theme} theme
 * @param {MountTransitionType} transitionType
 * @param {"enter" | "exit"} phase
 * @returns {CreateCSSProperties}
 */
function getIOSTransitionActivePhaseCSS(
  theme: Theme,
  transitionType: MountTransitionType,
  phase: MountTransitionStartPhaseType,
): CreateCSSProperties {
  const isEnter = phase === 'enter';
  const isMain = transitionType === 'main';

  if (isMain) {
    return {
      '&:before': {
        backgroundColor: isEnter
          ? 'transparent'
          : theme.components.ViewTransition.colors.suspender,
      },
    };
  }

  return {
    transform: `translateY(${isEnter ? '-100%' : '100%'})`,
  };
}

/**
 * Returns CSS for active phase of Android transition
 * @param {Theme} theme
 * @param {MountTransitionType} transitionType
 * @param {"enter" | "exit"} phase
 * @returns {CreateCSSProperties}
 */
function getAndroidTransitionActivePhaseCSS(
  theme: Theme,
  transitionType: MountTransitionType,
  phase: MountTransitionStartPhaseType,
): CreateCSSProperties {
  const isEnter = phase === 'enter';
  const isMain = transitionType === 'main';

  if (isMain) {
    return {};
  }

  return {
    transform: `translate(${
      isEnter ? 0 : VIEW_TRANSITION_ANDROID_LEFT
    }px, ${
      isEnter ? 0 : VIEW_TRANSITION_ANDROID_TOP
    }px)`,
    opacity: isEnter ? 1 : 0,
  };
}

/**
 * Creates handler which returns CSS for active phase of transition
 * @param {Theme} theme
 * @param {MountTransitionStartPhaseType} phase
 * @returns {(options: T) => CreateCSSProperties<{}>}
 */
export const createViewActivePhaseTransitionGenerator: TransitionPhaseGenerator =
  (theme, phase) => ({os, transitionType}) => os === OS.IOS
    ? getIOSTransitionActivePhaseCSS(theme, transitionType, phase)
    : getAndroidTransitionActivePhaseCSS(theme, transitionType, phase);
