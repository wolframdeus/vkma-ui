import {memo} from 'react';

import {makeStyles} from '@material-ui/styles';
import {Theme} from '../types';

import {useDevice} from './DeviceProvider';

const useStyles = makeStyles((theme: Theme) => {
  const {text, backgroundColor} = theme.global;

  return {
    '@global': {
      html: {
        height: '100%',
      },
      body: {
        height: '100%',
        overflowX: 'hidden',
        color: text.colors.primary,
        backgroundColor,
        fontFamily: theme.global.text.fontFamily,
        fontSize: 16,
        userSelect: 'none',
        '-webkit-font-smoothing': 'antialiased',
        '-webkit-tap-highlight-color': 'transparent',
        '-webkit-text-size-adjust': '100%',
      },
      '#root': {
        height: '100%',
      },
      'body, #root': {
        margin: 0,
        padding: 0,
      },
    },
  };
}, {name: 'GlobalStyleSheet'});

/**
 * Component which controls global styles
 * @type {React.NamedExoticComponent<object>}
 */
export const GlobalStyleSheet = memo(function GlobalStyleSheet() {
  useStyles({os: useDevice().os});
  return null;
});
