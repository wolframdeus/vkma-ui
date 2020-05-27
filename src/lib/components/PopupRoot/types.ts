import {ReactNode, ReactNodeArray} from 'react';
import {MountHistoryContext} from '../MountHistory';

export interface PopupRootProps {
  /**
   * Active popup by default
   * @default null
   */
  defaultPopup?: string | null;

  /**
   * Children elements
   */
  children?: ReactNode | ReactNodeArray;
}

export interface PopupRootContextCore {
  /**
   * Adds popup to list of mounted popups
   * @param {string} id
   */
  mountPopup(id: string): void;

  /**
   * Removes popup from list of mounted popups
   * @param {string} id
   */
  unmountPopup(id: string): void;
}

export interface PopupRootContext extends MountHistoryContext, PopupRootContextCore {
}
