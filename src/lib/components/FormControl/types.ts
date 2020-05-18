import {HTMLAttributes} from 'react';

export interface FormControlProps extends HTMLAttributes<HTMLDivElement> {
  isFocused?: boolean;
}

export interface FormControlTheme {
  colors: {
    background: string;
    border: string;
    borderFocused: string;
  };
}
