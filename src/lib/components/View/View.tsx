import React, {Children, memo} from 'react';
import c from 'classnames';

import {MountHistory} from '../MountHistory';
import {PanelTransition} from '../PanelTransition';

import {makeStyles} from '@material-ui/styles';

import {ViewProps} from './types';
import {viewMountHistoryContext} from './context';

const useStyles = makeStyles({
  root: {
    height: '100%',
    width: '100%',
  },
}, {name: 'View'});

export const View = memo(function ViewInner(props: ViewProps) {
  const {
    children, className, keepMounted, keepMountedAfterSuspend, activePanel,
    id, ...rest
  } = props;
  const mc = useStyles(props);
  const childrenArr = Children.map(children, c => (
    <PanelTransition id={c.props.id}>{c}</PanelTransition>
  ));

  return (
    <div className={c(mc.root, className)} {...rest}>
      <MountHistory
        activeElement={activePanel}
        context={viewMountHistoryContext}
      >
        {childrenArr}
      </MountHistory>
    </div>
  );
});
