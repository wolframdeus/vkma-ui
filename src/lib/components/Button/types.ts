import {ButtonHTMLAttributes, ReactNode} from 'react';
import {StyledComponentProps} from '@material-ui/styles';
import {OS} from '../../types';

export type ButtonVariantType = 'primary' | 'secondary' | 'tertiary'
  | 'outline';

export interface Point {
  x: number;
  y: number;
}

export interface Ripple {
  id: string;
  coords: Point;
  removeTimeoutId: number | null;
}

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>, StyledComponentProps {
  /**
   * Insert inside button before content
   */
  before?: ReactNode;

  /**
   * Insert inside button after content
   */
  after?: ReactNode;

  /**
   * Button variant
   */
  variant?: ButtonVariantType;

  /**
   * Url. If passed, "a" tag will be rendered
   */
  href?: string;

  /**
   * Should button take full available width
   */
  fullWidth?: boolean;

  /**
   * Button size - medium | large | extra large
   */
  size?: 'm' | 'l' | 'xl';
}

export interface ButtonUseStylesProps extends ButtonProps {
  os: OS;
}
