import {Context, ReactNode, ReactNodeArray} from 'react';

/**
 * History action type
 */
export type MountHistoryActionType = 'push' | 'pop';

/**
 * Props which outer components could use to make MountHistory do some work
 * with them
 */
export interface MountableProps {
  /**
   * Guarantees that component is always mounted until its parent is unmounted.
   *
   * To detect, if component is currently active, use "isSuspended" prop
   * @default false
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
   * @default false
   */
  keepMountedAfterSuspend?: boolean;
}

/**
 * Props which should be used in mountable component
 */
export interface MountableComponentProps extends MountableProps {
  /**
   * Element unique identifier. It is required to detect element and decide
   * which props to pass to current component
   */
  id: string;
}

export interface MountHistoryContext {
  /**
   * Current active element
   */
  activeElement: string | null;

  /**
   * Previously mounted elements during history lifetime
   */
  previouslyMountedElements: string[];

  /**
   * Contains elements mount history
   */
  mountHistory: (string | null)[];

  /**
   * Last history action
   */
  lastAction: MountHistoryActionType;

  /**
   * Last poped element
   */
  lastPopedElement: string | null;
}

export interface MountHistoryProps {
  /**
   * Current active element
   */
  activeElement: string | null;

  /**
   * Children elements
   */
  children?: ReactNode | ReactNodeArray;

  /**
   * Context to share with children
   */
  context: Context<MountHistoryContext>;
}
