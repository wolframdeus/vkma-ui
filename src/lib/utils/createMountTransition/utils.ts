import {useCallback, useMemo} from 'react';
import {EnterHandler, ExitHandler} from 'react-transition-group/Transition';
import {MountHistoryActionType} from '../../components/MountHistory';
import {MountTransitionType, UseTransitionHandlersOptions} from '../../components/MountTransition/types';

export function useTransitionHandlers(options: UseTransitionHandlersOptions) {
  const {
    setIsTransitioning,
    onExited: _onExited,
    onEntered: _onEntered,
    onEntering: _onEntering,
    onExiting: _onExiting,
  } = options;

  const createEnterPhaseHandler = useCallback((isActivePhase, handler?: EnterHandler) => {
    return (node: HTMLElement, isAppearing: boolean) => {
      setIsTransitioning(isActivePhase);

      if (handler) {
        handler(node, isAppearing);
      }
    };
  }, [setIsTransitioning]);

  const createExitPhaseHandler = useCallback((isActivePhase, handler?: ExitHandler) => {
    return (node: HTMLElement) => {
      setIsTransitioning(isActivePhase);

      if (handler) {
        handler(node);
      }
    };
  }, [setIsTransitioning]);

  const onEntering = useMemo(
    () => createEnterPhaseHandler(true, _onEntering),
    [createEnterPhaseHandler, _onEntering],
  );
  const onEntered = useMemo(
    () => createEnterPhaseHandler(false, _onEntered),
    [createEnterPhaseHandler, _onEntered],
  );
  const onExiting = useMemo(
    () => createExitPhaseHandler(true, _onExiting),
    [createExitPhaseHandler, _onExiting],
  );
  const onExited = useMemo(
    () => createExitPhaseHandler(false, _onExited),
    [createExitPhaseHandler, _onExited],
  );

  return {onEntering, onEntered, onExiting, onExited};
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
  lastHistoryAction: MountHistoryActionType,
): MountTransitionType {
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
