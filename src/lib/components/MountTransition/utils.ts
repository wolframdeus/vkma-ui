import {useCallback, useMemo} from 'react';
import {EnterHandler, ExitHandler} from 'react-transition-group/Transition';
import {useGSS} from '../GlobalStyleSheet';

interface UseTransitionHandlersOptions {
  onEntering?: EnterHandler;
  onEntered?: EnterHandler;
  onExiting?: ExitHandler;
  onExited?: ExitHandler;
}

/**
 * Returns function which controls overflow hidden depending on transition
 * phase
 * @returns {() => void}
 * @param {boolean} isActivePhase
 * @param elemId
 */
function useGSSLayoutController(isActivePhase: boolean, elemId: symbol) {
  const {
    requestOverflowHide, releaseOverflowHide, releaseRestrictPointerEvents,
    requestRestrictPointerEvents,
  } = useGSS();

  return useCallback(() => {
    if (isActivePhase) {
      requestRestrictPointerEvents(elemId);
      requestOverflowHide(elemId);
    } else {
      releaseRestrictPointerEvents(elemId);
      releaseOverflowHide(elemId);
    }
  }, [
    isActivePhase, requestOverflowHide, releaseOverflowHide,
    requestRestrictPointerEvents, releaseRestrictPointerEvents,
    elemId,
  ]);
}

/**
 * Returns handler for enter phases
 * @param {boolean} isActivePhase
 * @param elemId
 * @param {EnterHandler} handler
 * @returns {EnterHandler}
 */
export function useEnterPhaseHandler(
  isActivePhase: boolean,
  elemId: symbol,
  handler?: EnterHandler,
) {
  const processOverflowRequest = useGSSLayoutController(isActivePhase, elemId);

  return useCallback<EnterHandler>((node, isAppearing) => {
    processOverflowRequest();

    if (handler) {
      handler(node, isAppearing);
    }
  }, [handler, processOverflowRequest]);
}

/**
 * Returns handler for exit phases
 * @param {boolean} isActivePhase
 * @param elemId
 * @param {EnterHandler} handler
 * @returns {EnterHandler}
 */
export function useExitPhaseHandler(
  isActivePhase: boolean,
  elemId: symbol,
  handler?: ExitHandler,
) {
  const processOverflowRequest = useGSSLayoutController(isActivePhase, elemId);

  return useCallback<ExitHandler>(node => {
    processOverflowRequest();

    if (handler) {
      handler(node);
    }
  }, [handler, processOverflowRequest]);
}

export function useTransitionHandlers(options: UseTransitionHandlersOptions) {
  const {
    onExited: _onExited,
    onEntered: _onEntered,
    onEntering: _onEntering,
    onExiting: _onExiting,
  } = options;
  const elemId = useMemo(Symbol, []);

  return {
    onEntering: useEnterPhaseHandler(true, elemId, _onEntering),
    onEntered: useEnterPhaseHandler(false, elemId, _onEntered),
    onExiting: useExitPhaseHandler(true, elemId, _onExiting),
    onExited: useExitPhaseHandler(false, elemId, _onExited),
  };
}
