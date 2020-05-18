import {InputHTMLAttributes} from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
}

export interface InputTheme {
  colors: {
    foreground: string;
    placeholder: string;
  };
}
