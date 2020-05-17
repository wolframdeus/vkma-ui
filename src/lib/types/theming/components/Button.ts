export interface ButtonColors {
  backgroundColor: string;
  foregroundColor: string;
  borderColor: string;
  rippleColor: string;
}

export interface ButtonVariant {
  colors: ButtonColors;
}

export interface ButtonTheme {
  primary: ButtonVariant;
  secondary: ButtonVariant;
  tertiary: ButtonVariant;
  outline: ButtonVariant;
}
