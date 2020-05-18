import React, {memo} from 'react';
import c from 'classnames';

import {makeStyles} from '@material-ui/styles';

import {useDevice} from '../DeviceProvider';

import {Theme} from '../ThemeProvider';
import {OS} from '../../types';
import {FormControlProps} from './types';

const useStyles = makeStyles<Theme, FormControlProps>(theme => {
  const {colors,} = theme.components.FormControl;
  const {background, border, borderFocused} = colors;

  return {
    root: {
      backgroundColor: background,
      border: `1px solid ${border}`,
      borderRadius: 10,
      boxSizing: 'border-box',
      fontSize: 16,
      fontFamily: theme.global.text.fontFamily,
      position: 'relative',
    },
    rootAndroid: {
      borderRadius: 8,
    },
    focused: {
      borderColor: borderFocused,
    },
  };
}, {name: 'FormControl'});

export const FormControl = memo(function FormControl(props: FormControlProps) {
  const {className, children, isFocused, ...rest} = props;
  const {os} = useDevice();
  const mc = useStyles(props);

  const rootClassName = c(mc.root, className, {
    [mc.focused]: isFocused,
    [mc.rootAndroid]: os === OS.Android,
  });

  return <div className={rootClassName} {...rest}>{children}</div>;
});
