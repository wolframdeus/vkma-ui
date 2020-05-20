import React, {memo} from 'react';
import c from 'classnames';

import {PanelHeaderBack} from '../PanelHeaderBack';

import {makeStyles} from '@material-ui/styles';
import {useDevice} from '../DeviceProvider';
import {
  PANEL_HEADER_HEIGHT_ANDROID,
  PANEL_HEADER_HEIGHT_IOS,
} from './constants';
import {usePanelTransition} from '../PanelTransition';
import {useViewTransition} from '../ViewTransition';

import {Theme} from '../ThemeProvider';
import {OS} from '../../types';
import {PanelHeaderProps} from './types';

interface UseStylesProps extends PanelHeaderProps {
  topInset: number;
}

const useStyles = makeStyles<Theme, UseStylesProps>(theme => ({
  root: {
    position: 'fixed',
    left: 0,
    top: 0,
    width: 'calc(100% - 8px)',
    height: PANEL_HEADER_HEIGHT_IOS - 8,
    padding: ({topInset}) => `${topInset + 4}px 4px 4px`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.components.PanelHeader.colors.background,
  },
  rootTransitioning: {
    position: 'absolute',
  },
  rootAndroid: {
    height: PANEL_HEADER_HEIGHT_ANDROID - 8,
  },
  before: {
    flex: '1 0 0',
  },
  beforeAndroid: {
    flex: '0 0 auto',
  },
  beforeEmpty: {},
  content: {
    flex: '1 0 auto',
    fontFamily: theme.global.text.fontFamilyTT,
    fontSize: 21,
    lineHeight: 1,
    fontWeight: 600,
    textAlign: 'center',
  },
  contentAndroid: {
    textAlign: 'left',
    fontSize: 20,
    paddingLeft: 12,
  },
  after: {
    flex: '1 0 0',
  },
  afterAndroid: {
    flex: '0 0 auto',
  },
  afterEmpty: {},
}), {name: 'PanelHeader'});

export const PanelHeader = memo(function PanelHeader(props: PanelHeaderProps) {
  const {children, className, before, after, backButton, ...rest} = props;
  const {os, insets} = useDevice();
  const panelTransition = usePanelTransition();
  const viewTransition = useViewTransition();
  const mc = useStyles({...props, topInset: insets.top});

  const isAndroid = os === OS.Android;
  const rootClassName = c(className, mc.root, {
    [mc.rootAndroid]: isAndroid,
    [mc.rootTransitioning]: panelTransition?.isTransitioning
    || viewTransition?.isTransitioning,
  });
  const beforeClassName = c(mc.before, {
    [mc.beforeEmpty]: !before && !backButton,
    [mc.beforeAndroid]: isAndroid,
  });
  const contentClassName = c(mc.content, {[mc.contentAndroid]: isAndroid});
  const afterClassName = c(mc.after, {
    [mc.afterEmpty]: !after,
    [mc.afterAndroid]: isAndroid,
  });

  return (
    <div className={rootClassName} {...rest}>
      <div className={beforeClassName}>
        {backButton && <PanelHeaderBack/>}
        {before}
      </div>
      <div className={contentClassName}>{children}</div>
      <div className={afterClassName}>{after}</div>
    </div>
  );
});
