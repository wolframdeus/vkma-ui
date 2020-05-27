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
        pointerEvents: ({isPointerEventsBlocked}) => isPointerEventsBlocked
          ? 'none'
          : 'all',
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
    const [
      requestRestrictPointerEventsElements,
      setRequestRestrictPointerEventsElements,
    ] = useState<symbol[]>([]);

    const appendItem = useCallback((arr: symbol[], item: symbol) => {
      return arr.includes(item) ? arr : [...arr, item];
    }, []);
    const spliceItem = useCallback((arr: symbol[], item: symbol) => {
      return arr.includes(item)
        ? arr.filter(i => i !== item)
        : arr;
    }, []);

    const requestOverflowHide = useCallback((item: symbol) => {
      setRequestOverflowElements(arr => appendItem(arr, item));
    }, [appendItem]);

    const releaseOverflowHide = useCallback((item: symbol) => {
      setRequestOverflowElements(arr => spliceItem(arr, item));
    }, [spliceItem]);

    const requestRestrictPointerEvents = useCallback((item: symbol) => {
      setRequestRestrictPointerEventsElements(arr => appendItem(arr, item));
    }, [appendItem]);

    const releaseRestrictPointerEvents = useCallback((item: symbol) => {
      setRequestRestrictPointerEventsElements(arr => spliceItem(arr, item));
    }, [spliceItem]);

    const context = useMemo<GlobalStyleSheetContext>(() => ({
      requestOverflowHide, releaseOverflowHide, requestRestrictPointerEvents,
      releaseRestrictPointerEvents,
    }), [
      requestOverflowHide, releaseOverflowHide, requestRestrictPointerEvents,
      releaseRestrictPointerEvents,
    ]);

    useStyles({
      isBodyOverflowHidden: requestOverflowElements.length > 0,
      isPointerEventsBlocked: requestRestrictPointerEventsElements.length > 0,
    });

    return <Provider value={context}>{children}</Provider>;
  },
);
