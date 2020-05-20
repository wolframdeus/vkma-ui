import React, {cloneElement, memo} from 'react';
import c from 'classnames';

import {CSSTransition} from 'react-transition-group';

import {makeStyles} from '@material-ui/styles';
import {useDevice} from '../DeviceProvider';
import {useTransitionHandlers} from './utils';

import {SuspenderTransitionProps} from './types';
import {OS} from '../../types';

const useStyles = makeStyles({
  unmounted: {display: 'none'},
}, {name: 'SuspenderTransition'});

export const SuspenderTransition = memo(
  function SuspenderTransition(props: SuspenderTransitionProps) {
    const {
      in: isActive, children, keepMounted, keepMountedAfterSuspend,
      androidDuration, iosDuration, classNames, isMountedBefore, onEnter,
      onEntered, onExit, onExited, transitionType, animate = true,
    } = props;
    const mc = useStyles(props);
    const {os} = useDevice();

    const keepMountedOnExit = keepMounted
      || (keepMountedAfterSuspend && isMountedBefore);
    const isAndroid = os === OS.Android;
    const timeout = isAndroid ? androidDuration : iosDuration;

    const formattedChildren = typeof children === 'undefined'
      ? null
      : cloneElement(children, {
        className: c(children.props.className, {
          [mc.unmounted]: animate
            // If animation is required, the only 1 thing we have to check
            // if component was mounted before
            ? !isMountedBefore
            // Otherwise, it is enough to check if element is currently active
            : !isActive,
        }),
      });

    const handlers = useTransitionHandlers({
      transitionType,
      onEnter,
      onEntered,
      onExit,
      onExited,
    });

    if (animate) {
      return (
        <CSSTransition
          in={isActive}
          mountOnEnter={!keepMounted}
          unmountOnExit={!keepMountedOnExit}
          classNames={classNames}
          timeout={timeout}
          {...handlers}
        >
          {formattedChildren}
        </CSSTransition>
      );
    }
    return keepMounted
    || (keepMountedAfterSuspend && isMountedBefore)
    || isActive
      ? formattedChildren
      : null;
  },
);
