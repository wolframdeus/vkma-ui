import {ClassicElement, HTMLAttributes} from 'react';
import {SuspendableComponentProps} from '../Suspender';

export interface ViewProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'id' | 'children'>,
    SuspendableComponentProps {
  /**
   * Currently active panel
   */
  activePanel: string;

  /**
   * Should view animate panel transitions
   */
  animate?: boolean;

  /**
   * List of panels
   */
  // FIXME: PanelProps
  children: ClassicElement<any> | ClassicElement<any>[];
}
