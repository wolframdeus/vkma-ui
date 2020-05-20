import React, {
  createContext,
  memo, NamedExoticComponent,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import {SuspenderTransition} from './SuspenderTransition';

import {makeStyles} from '@material-ui/styles';
import {useDevice} from '../DeviceProvider';
import {useGSS} from '../GlobalStyleSheet';

import {Theme} from '../ThemeProvider';
import {OS} from '../../types';
import {EnterHandler, ExitHandler} from 'react-transition-group/Transition';
import {
  SuspendHistoryActionType,
  SuspendTransitionType,
  useSuspender,
} from '../Suspender';
import {
  CreateTransitionComponentOptions,
  CustomSuspenderTransitionContext,
  CustomSuspenderTransitionProps,
  UseTransitionHandlersOptions,
} from './types';

/**
 * Returns function which updates overflow request depending transition type
 * and phase type
 * @param {SuspendTransitionType} transitionType
 * @param {boolean} isActivePhase
 * @returns {() => void}
 */
function useOverflowController(
  transitionType: SuspendTransitionType,
  isActivePhase: boolean,
) {
  const {requestOverflowHide, releaseOverflowHide} = useGSS();
  const requestId = useMemo(Symbol, []);

  return useCallback(() => {
    if (transitionType === 'alternative') {
      if (isActivePhase) {
        requestOverflowHide(requestId);
      } else {
        releaseOverflowHide(requestId);
      }
    }
  }, [
    requestId, requestOverflowHide, releaseOverflowHide, transitionType,
    isActivePhase,
  ]);
}

/**
 * Returns enter transition handler
 * @param {SuspendTransitionType} transitionType
 * @param {boolean} isActivePhase
 * @param {EnterHandler} handler
 * @returns {(node, isAppearing) => void}
 */
function useEnterTransitionHandler(
  transitionType: SuspendTransitionType,
  isActivePhase: boolean,
  handler?: EnterHandler,
) {
  const processOverflowRequest = useOverflowController(
    transitionType, isActivePhase,
  );
  // Return handler
  return useCallback<EnterHandler>((node, isAppearing) => {
    processOverflowRequest();

    if (handler) {
      handler(node, isAppearing);
    }
  }, [handler, processOverflowRequest]);
}

/**
 * Returns exit transition handler
 * @param {SuspendTransitionType} transitionType
 * @param {boolean} isActivePhase
 * @param {EnterHandler} handler
 * @returns {(node, isAppearing) => void}
 */
function useExitTransitionHandler(
  transitionType: SuspendTransitionType,
  isActivePhase: boolean,
  handler?: ExitHandler,
) {
  const processOverflowRequest = useOverflowController(
    transitionType, isActivePhase,
  );
  // Return handler
  return useCallback<ExitHandler>(node => {
    processOverflowRequest();

    if (handler) {
      handler(node);
    }
  }, [handler, processOverflowRequest]);
}

/**
 * Creates CSSTransition handlers
 * @param {UseTransitionHandlersOptions} options
 * @returns {{onEnter: (node: HTMLElement, isAppearing: boolean) => void; onExit: (node: HTMLElement) => void; onExited: (node: HTMLElement) => void; onEntered: (node: HTMLElement, isAppearing: boolean) => void}}
 */
export function useTransitionHandlers(options: UseTransitionHandlersOptions) {
  const {transitionType, onEnter, onEntered, onExit, onExited} = options;

  return {
    onEnter: useEnterTransitionHandler(transitionType, false, onEnter),
    onEntered: useEnterTransitionHandler(transitionType, true, onEntered),
    onExit: useExitTransitionHandler(transitionType, false, onExit),
    onExited: useExitTransitionHandler(transitionType, true, onExited),
  };
}

/**
 * Returns transition type depending on current element active, poped statues
 * of element and last history action
 * @param {boolean} isActive
 * @param {boolean} isLastPoped
 * @param {SuspendHistoryActionType} lastHistoryAction
 * @returns {SuspendTransitionType}
 */
export function getTransitionType(
  isActive: boolean,
  isLastPoped: boolean,
  lastHistoryAction: SuspendHistoryActionType,
): SuspendTransitionType {
  // This like makes no difference what to return due to this element is
  // out of user view
  if (!isActive && !isLastPoped) {
    return 'alternative';
  }

  // If some element was pushed to queue and current element was poped,
  // it should be main transition
  if (lastHistoryAction === 'push') {
    return isLastPoped ? 'main' : 'alternative';
  }

  // Otherwise, if element was poped from queue and this element is current,
  // it means it should have alternative transition
  return isLastPoped ? 'alternative' : 'main';
}

/**
 * Creates custom SuspenderTransition component
 * @param {CreateTransitionComponentOptions} options
 * @returns {{Component: React.NamedExoticComponent<Props>; useContext: () => Context}}
 */
export function createSuspenderTransitionComponent(
  options: CreateTransitionComponentOptions,
): [
  NamedExoticComponent<CustomSuspenderTransitionProps>,
  () => CustomSuspenderTransitionContext | null
] {
  interface UseStylesProps {
    transitionType: SuspendTransitionType;
    os: OS;
  }

  const {
    displayName, createActivePhaseTransitionGenerator,
    createStartPhaseTransitionGenerator, androidDuration, iosDuration,
  } = options;

  const useStyles = makeStyles<Theme, UseStylesProps>(
    theme => ({
      enter: createStartPhaseTransitionGenerator(theme, 'enter'),
      enterActive: createActivePhaseTransitionGenerator(theme, 'enter'),
      exit: createStartPhaseTransitionGenerator(theme, 'exit'),
      exitActive: createActivePhaseTransitionGenerator(theme, 'exit'),
      exitDone: {display: 'none'},
    }), {name: displayName},
  );

  const context = createContext<CustomSuspenderTransitionContext | null>(null);
  const {Provider} = context;

  const Component = function (props: CustomSuspenderTransitionProps) {
    const suspender = useSuspender();

    if (suspender === null) {
      throw new Error(
        `Transition ${displayName} tried to render `
        + `outside of Suspender context`,
      );
    }

    const {id, children, keepMounted, keepMountedAfterSuspend} = props;
    const {
      activeElement, lastHistoryAction, lastPopedElement, mountedElements,
      animate = true,
    } = suspender;
    const {os} = useDevice();
    const isActive = activeElement === id;
    const isLastPoped = lastPopedElement === id;
    const isMountedBefore = mountedElements.includes(id);
    const transitionType = getTransitionType(
      isActive, isLastPoped, lastHistoryAction,
    );
    const mc = useStyles({...props, os, transitionType});

    const [isTransitioning, setIsTransitioning] = useState(false);

    const contextValue = useMemo<CustomSuspenderTransitionContext>(() => ({
      isMountedBefore,
      keepMounted,
      keepMountedAfterSuspend,
      isTransitioning,
    }), [
      isMountedBefore, keepMounted, keepMountedAfterSuspend, isTransitioning,
    ]);

    const onEnter = useCallback(() => setIsTransitioning(true), []);
    const onEntered = useCallback(() => setIsTransitioning(false), []);
    const onExit = useCallback(() => setIsTransitioning(true), []);
    const onExited = useCallback(() => setIsTransitioning(false), []);

    return (
      <Provider value={contextValue}>
        <SuspenderTransition
          classNames={mc}
          animate={animate}
          androidDuration={androidDuration}
          iosDuration={iosDuration}
          isMountedBefore={isMountedBefore}
          in={isActive}
          transitionType={transitionType}
          keepMounted={keepMounted}
          keepMountedAfterSuspend={keepMountedAfterSuspend}
          onEnter={onEnter}
          onEntered={onEntered}
          onExit={onExit}
          onExited={onExited}
        >
          {children}
        </SuspenderTransition>
      </Provider>
    );
  };

  // Assign human-readable component name
  Object.defineProperty(Component, 'name', {value: displayName});

  return [memo(Component), () => useContext(context)];
}
