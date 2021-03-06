import {HTMLAttributes} from 'react';

export interface SeparatorProps extends HTMLAttributes<HTMLDivElement> {
  fullWidth?: boolean;
}

export interface SeparatorTheme {
  colors: {
    background: string;
  };
}
