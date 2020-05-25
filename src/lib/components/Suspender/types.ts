import {ReactNode, ReactNodeArray} from 'react';

/**
 * Suspend component type
 */
export type SuspendTransitionType = 'main' | 'alternative';

/**
 * History action type
 */
export type SuspendHistoryActionType = 'push' | 'pop';

/**
 * List of props, developers can freely use. These are passed directly as
 * properties to React components
 */
export interface SuspendablePublicProps {
  /**
   * Guarantees that component is always mounted until its parent is unmounted.
   *
   * To detect, if component is currently active, use "isSuspended" prop
   */
  keepMounted?: boolean;

  /**
   * Makes component stay in React tree after it became suspended. It means,
   * component will not call methods like componentWillUnmount or something
   * like this, because naturally, it will not be unmounted. If false,
   * component will be unmounted and mounted again when becomes active and
   * so, all onmount handlers will be called.
   *
   * This feature is required when you don't want to call some handlers each
   * time component mounts.
   *
   * To detect, if component is currently active, use "isSuspended" prop
   */
  keepMountedAfterSuspend?: boolean;
}

/**
 * List of props, suspendable component should accept
 */
export interface SuspendableComponentProps extends SuspendablePublicProps {
  /**
   * Element unique identifier. It is required to detect element and decide
   * which props to pass current component
   */
  id: string;

  /**
   * Children which can optionally support passed props by Suspend
   */
  children?: ReactNode | ReactNodeArray;
}

export interface SuspenderProps {
  /**
   * Current active element
   */
  activeElement: string;

  /**
   * Should suspender animate transitions
   */
  animate?: boolean;

  /**
   * List of children elements
   */
  children: ReactNode | ReactNodeArray;
}

export interface SuspenderContext {
  /**
   * Current active element
   */
  activeElement: string;

  /**
   * Should animation be applied
   */
  animate?: boolean;

  /**
   * Last poped element
   */
  lastPopedElement: string | null;

  /**
   * Previously mounted elements
   */
  mountedElements: string[];

  /**
   * Last history action
   */
  lastHistoryAction: SuspendHistoryActionType;
}
