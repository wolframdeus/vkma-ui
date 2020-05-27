import {ClassicElement, HTMLAttributes} from 'react';
import {MountableComponentProps} from '../MountHistory';

export interface ViewChildProps extends MountableComponentProps {
  className?: string;
}

export interface ViewProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'id' | 'children'>,
    MountableComponentProps {
  /**
   * Currently active panel
   */
  activePanel: string;

  /**
   * List of panels
   */
  children: ClassicElement<ViewChildProps> | ClassicElement<ViewChildProps>[];
}
