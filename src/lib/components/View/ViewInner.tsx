import React, {memo} from 'react';
import c from 'classnames';

import {makeStyles} from '@material-ui/styles';

import {Suspender} from '../Suspender';

import {ViewProps} from './types';

const useStyles = makeStyles({
  root: {
    height: '100%',
    width: '100%',
  },
}, {name: 'View'});

export const ViewInner = memo(function ViewInner(props: ViewProps) {
  const {
    children, className, keepMounted, keepMountedAfterSuspend,
    activePanel, id, animate = true, ...rest
  } = props;
  const mc = useStyles(props);

  return (
    <div className={c(mc.root, className)} data-id={id} {...rest}>
      <Suspender activeElement={activePanel} animate={animate}>
        {children}
      </Suspender>
    </div>
  );
});
