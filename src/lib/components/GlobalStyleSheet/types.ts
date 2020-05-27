import {ReactNode, ReactNodeArray} from 'react';

export interface GlobalStyleSheetProps {
  children?: ReactNode | ReactNodeArray;
}

export interface UseGlobalStyleSheetStyles extends GlobalStyleSheetProps {
  isBodyOverflowHidden: boolean;
  isPointerEventsBlocked: boolean;
}

export interface GlobalStyleSheetContext {
  /**
   * Adds element to list of elements, which want body overflow to hide
   * @param {symbol} elem
   */
  requestOverflowHide(elem: symbol): void;

  /**
   * Removes element from list of elements, which want body overflow to hide
   * @param {symbol} elem
   */
  releaseOverflowHide(elem: symbol): void;

  /**
   * Adds element to list of elements, which want to restrict all pointer events
   * @param {symbol} elem
   */
  requestRestrictPointerEvents(elem: symbol): void;

  /**
   * Removes element from list of elements, which want to restrict all pointer
   * events
   * @param {symbol} elem
   */
  releaseRestrictPointerEvents(elem: symbol): void;
}
