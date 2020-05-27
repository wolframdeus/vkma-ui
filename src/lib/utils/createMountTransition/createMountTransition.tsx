import React, {
  createContext,
  memo,
  useContext,
  useMemo,
  useState,
} from 'react';

import {MountTransition} from '../../components/MountTransition';

import {OS} from '../../types';
import {
  CreateMountTransitionOptions,
  CreateMountTransitionTuple,
  CustomMountTransitionContext,
  CustomMountTransitionProps,
} from './types';

import {makeStyles} from '@material-ui/styles';
import {useDevice} from '../../components/DeviceProvider';
import {getTransitionType, useTransitionHandlers} from './utils';

/**
 * Returns component which represents custom MountTransition wrapped
 * with context. Additionally returns handler which can return context value
 * @param {CreateMountTransitionOptions} options
 * @returns {CreateMountTransitionTuple}
 */
export function createMountTransition(
  options: CreateMountTransitionOptions,
): CreateMountTransitionTuple {
  const {
    displayName, styles, mountHistoryContext, androidTimeout, iosTimeout,
  } = options;

  const context = createContext<CustomMountTransitionContext>({
    isTransitioning: false,
  });
  const {Provider} = context;
  const useStyles = makeStyles(styles, {name: displayName});

  const Component = function (props: CustomMountTransitionProps) {
    const {onExited, onExiting, onEntered, onEntering, id, ...rest} = props;

    const {
      activeElement, lastPopedElement, lastAction, previouslyMountedElements,
    } = useContext(mountHistoryContext);
    const {os} = useDevice();
    const [isTransitioning, setIsTransitioning] = useState(false);

    const isActive = activeElement === id;
    const isLastPoped = lastPopedElement === id;
    const isMountedBefore = previouslyMountedElements.includes(id);

    const transitionType = getTransitionType(isActive, isLastPoped, lastAction);
    const mc = useStyles({transitionType, os});

    const contextValue = useMemo<CustomMountTransitionContext>(() => ({
      isTransitioning,
    }), [isTransitioning]);

    const handlers = useTransitionHandlers({
      onExiting, onEntering, onEntered, onExited, setIsTransitioning,
    });

    const timeout = os === OS.IOS ? iosTimeout : androidTimeout;

    return (
      <Provider value={contextValue}>
        <MountTransition
          {...rest}
          {...handlers}
          in={isActive}
          isMountedBefore={isMountedBefore}
          timeout={timeout}
          classNames={mc}
        />
      </Provider>
    );
  };

  // Assign human-readable names
  if (displayName) {
    Object.defineProperty(Component, 'name', {value: displayName});
    context.displayName = displayName + 'Context';
  }

  return [memo(Component), () => useContext(context)];
}
