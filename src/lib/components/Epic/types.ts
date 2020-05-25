import {ReactElement} from 'react';

export interface EpicChildProps {
  id: string;
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
