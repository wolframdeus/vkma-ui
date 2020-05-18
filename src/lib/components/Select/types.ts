import {SelectHTMLAttributes} from 'react';

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
}

export interface SelectTheme {
  colors: {
    foreground: string;
    placeholder: string;
    icon: string;
  };
}
