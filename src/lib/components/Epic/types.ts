import {ClassicElement} from 'react';
import {ViewProps} from '../View';

export interface EpicProps {
  /**
   * Array of views
   */
  children: ClassicElement<ViewProps> | ClassicElement<ViewProps>[];

  /**
   * Currently active view
   */
  activeView: string;

  /**
   * Should Epic change views with animation
   */
  animate?: boolean;
}
