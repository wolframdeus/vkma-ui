import {ClassicElement, HTMLAttributes} from 'react';
import {SuspendableComponentProps} from '../Suspender';

export interface ViewChildProps {
  id: string;
  className?: string;
}

export interface ViewProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'id' | 'children'>,
    SuspendableComponentProps {
  /**
   * Currently active panel
   */
  activePanel: string;

  /**
   * Should view animate panel transitions
   * @default true
   */
  animate?: boolean;

  /**
   * List of panels
   */
  children: ClassicElement<ViewChildProps> | ClassicElement<ViewChildProps>[];
}
