import React, {memo, useCallback, useMemo, useState} from 'react';

import {makeStyles} from '@material-ui/styles';
import {globalStyleSheetContext} from './context';

import {Theme} from '../ThemeProvider';
import {
  GlobalStyleSheetContext,
  GlobalStyleSheetProps,
  UseGlobalStyleSheetStyles,
} from './types';

const {Provider} = globalStyleSheetContext;

const useStyles = makeStyles<Theme, UseGlobalStyleSheetStyles>((theme: Theme) => {
  const {text, backgroundColor} = theme.global;

  return {
    '@global': {
      html: {
        height: '100%',
      },
      body: {
        height: '100%',
        overflowX: 'hidden',
        overflowY: ({isBodyOverflowHidden}) => isBodyOverflowHidden
          ? 'hidden'
          : 'auto',
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
export const GlobalStyleSheet = memo(
  function GlobalStyleSheet(props: GlobalStyleSheetProps) {
    const {children} = props;
    const [requestOverflowElements, setRequestOverflowElements] =
      useState<symbol[]>([]);

    const requestOverflowHide = useCallback((elem: symbol) => {
      setRequestOverflowElements(elements => {
        if (elements.includes(elem)) {
          return elements;
        }
        return [...elements, elem];
      });
    }, []);

    const releaseOverflowHide = useCallback((elem: symbol) => {
      setRequestOverflowElements(elements => {
        if (elements.includes(elem)) {
          return elements;
        }
        return [...elements, elem];
      });
    }, []);

    const context = useMemo<GlobalStyleSheetContext>(() => ({
      requestOverflowHide,
      releaseOverflowHide,
    }), [requestOverflowHide, releaseOverflowHide]);

    useStyles({isBodyOverflowHidden: requestOverflowElements.length > 0});

    return <Provider value={context}>{children}</Provider>;
  },
);
