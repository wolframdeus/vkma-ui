import React, {ChangeEvent, memo, useCallback} from 'react';

import {makeStyles} from '@material-ui/styles';
import {Theme} from '../lib/components/ThemeProvider';

import {useOSProvider} from './OSProvider';
import {OS} from '../lib/types';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginBottom: 20,
  },
  select: {
    marginBottom: 15,

    '& + &': {
      marginLeft: 15,
    },
  },
  note: {
    display: 'block',
    color: theme.global.text.colors.secondary,
    fontSize: 14,
  },
}));

export const Controls = memo(function Controls() {
  const mc = useStyles();
  // const {scheme, setScheme} = useTheme();
  const {os, setOS} = useOSProvider();
  // FIXME: Realise
  // const onThemeChange = useCallback(
  //   (event: ChangeEvent<HTMLSelectElement>) => {
  //     setScheme(event.target.value as AppearanceSchemeType);
  //   }, [setScheme],
  // );
  const onOSChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      setOS(parseInt(event.target.value) as OS);
    }, [setOS],
  );

  return (
    <div className={mc.root}>
      {/*<select className={mc.select} value={scheme} onChange={onThemeChange}>*/}
      {/*  <option value={'bright_light'}>bright_light</option>*/}
      {/*  <option value={'space_gray'}>space_gray</option>*/}
      {/*</select>*/}
      <select className={mc.select} value={os} onChange={onOSChange}>
        <option value={OS.IOS}>IOS</option>
        <option value={OS.Android}>Android</option>
      </select>
      <i className={mc.note}>
        NOTE: Stable work while changing OS is not guaranteed
      </i>
    </div>
  );
});
