import React, {cloneElement, memo} from 'react';

import CSSTransition from 'react-transition-group/CSSTransition';

import c from 'classnames';
import {makeStyles} from '@material-ui/styles';
import {useTransitionHandlers} from './utils';

import {MountTransitionProps} from './types';

const useStyles = makeStyles({
  unmounted: {display: 'none'},
}, {name: 'MountTransition'});

export const MountTransition = memo(
  function MountTransition(props: MountTransitionProps) {
    const {
      in: isActive, children, classNames, timeout, isMountedBefore,
      keepMounted, keepMountedAfterSuspend, ...rest
    } = props;
    const mc = useStyles(props);

    // States if element should stay in DOM tree after exit
    const keepMountedOnExit = keepMounted ||
      (keepMountedAfterSuspend && isMountedBefore);
    const formattedChild = typeof children === 'undefined'
      ? undefined
      : cloneElement(children, {
        className: c(children.props.className, {
          [mc.unmounted]: !isMountedBefore,
        }),
      });

    const handlers = useTransitionHandlers(rest);

    return (
      <CSSTransition
        {...handlers}
        in={isActive}
        mountOnEnter={keepMounted}
        unmountOnExit={!keepMountedOnExit}
        timeout={timeout}
        classNames={classNames}
      >
        {formattedChild}
      </CSSTransition>
    );
  },
);
