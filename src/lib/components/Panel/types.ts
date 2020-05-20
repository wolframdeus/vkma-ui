import {SuspendableComponentProps} from '../Suspender';
import {ComponentType, HTMLAttributes} from 'react';

export interface PanelProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'id' | 'children'>,
    SuspendableComponentProps {
  /**
   * Does panel contains header
   */
  header?: boolean;
  /**
   * Component which should be rendered inside panel
   */
  component?: ComponentType;
}

export interface PanelContext {
  /**
   * Placeholder for header
   */
  headerContainer: HTMLDivElement | null;
}

export interface UsePanelStyles extends PanelProps {
  topInset: number;
  bottomInset: number;
}

export interface PanelTheme {
  colors: {
    background: string;
  };
}
