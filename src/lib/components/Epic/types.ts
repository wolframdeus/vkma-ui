import {ReactElement} from 'react';
import {MountableComponentProps} from '../MountHistory';

export interface EpicChildProps extends MountableComponentProps {
  className?: string;
}

export interface EpicProps {
  /**
   * Array of views
   */
  children: ReactElement<EpicChildProps> | ReactElement<EpicChildProps>[];

  /**
   * Currently active view
   */
  activeView: string;

  /**
   * Should Epic change views with animation
   * @default true
   */
  animate?: boolean;
}

export interface EpicInnerProps extends Omit<EpicProps, 'activeView'> {
}
