import React, {Children, cloneElement, memo} from 'react';
import {EpicInnerProps} from './types';

import {ViewTransition} from '../ViewTransition';

import {useEpicMountHistory} from './context';
import {makeStyles} from '@material-ui/styles';
import c from 'classnames';

const useStyles = makeStyles({
  unmounted: {display: 'none'},
}, {name: 'EpicInner'});

export const EpicInner = memo(function EpicInner(props: EpicInnerProps) {
  const {animate = true, children} = props;
  const {previouslyMountedElements, activeElement} = useEpicMountHistory();
  const mc = useStyles();

  const formattedChildren = Children.map(children, child => {
    const {id, keepMountedAfterSuspend, keepMounted} = child.props;
    const isActive = activeElement === id;
    const isMountedBefore = previouslyMountedElements.includes(id);

    const formattedChild = cloneElement(child, {
      className: c(child.props.className, {
        [mc.unmounted]: !animate && !isActive,
      }),
    });

    return animate
      ? <ViewTransition id={id}>{formattedChild}</ViewTransition>
      : (
        keepMounted ||
        (keepMountedAfterSuspend && isMountedBefore) ||
        isActive
          ? formattedChild
          : null
      );
  });

  return <>{formattedChildren}</>;
});
