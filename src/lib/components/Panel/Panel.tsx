import React, {memo, ReactNode, ReactNodeArray} from 'react';
import c from 'classnames';

import {Separator} from '../Separator';

import {makeStyles} from '@material-ui/styles';
import {useDevice} from '../DeviceProvider';
import {
  PANEL_HEADER_HEIGHT_ANDROID,
  PANEL_HEADER_HEIGHT_IOS,
} from '../PanelHeader';

import {Theme} from '../ThemeProvider';
import {OS} from '../../types';
import {PanelProps, UsePanelStyles} from './types';

const useStyles = makeStyles<Theme, UsePanelStyles>(theme => ({
  root: {
    width: '100%',
    height: '100%',
    boxSizing: 'border-box',
    backgroundColor: theme.components.Panel.colors.background,
    padding: ({bottomInset, topInset, header}) => {
      const paddingTop = topInset + (header ? PANEL_HEADER_HEIGHT_IOS : 0);
      return `${paddingTop}px 0 ${bottomInset}px`;
    },
  },
  rootAndroid: {
    padding: ({bottomInset, topInset, header}) => {
      const paddingTop = topInset + (header ? PANEL_HEADER_HEIGHT_ANDROID : 0);
      return `${paddingTop}px 0 ${bottomInset}px`;
    },
  },
  content: {
    width: '100%',
    height: '100%',
    overflow: 'auto',
  },
}), {name: 'Panel'});

export const Panel = memo(function PanelInner(props: PanelProps) {
  const {
    className, component: Component, children, header = true,
    keepMounted, keepMountedAfterSuspend, id,
    ...rest
  } = props;

  if (Component && children) {
    throw new Error(
      'It is not allowed to pass "component" along with "children" props in ' +
      'Panel',
    );
  }
  let content: ReactNode | ReactNodeArray = null;

  if (Component) {
    content = <Component/>;
  } else if (children) {
    content = children;
  }

  const {os, insets} = useDevice();

  const mc = useStyles({
    ...props,
    header,
    topInset: insets.top,
    bottomInset: insets.bottom,
  });

  const rootClassName = c(
    className,
    mc.root,
    {[mc.rootAndroid]: os === OS.Android},
  );

  return (
    <div className={rootClassName} data-id={id} {...rest}>
      <div className={mc.content}>
        <Separator/>
        {content}
      </div>
    </div>
  );
});
