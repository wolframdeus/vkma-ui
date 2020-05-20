import React, {memo} from 'react';
import c from 'classnames';

import {Button} from '../Button';
import {RouterLink} from 'vkma-router';
// TODO: Move away from this lib into vkma-icons
import {ArrowLeftOutlineSvg} from './ArrowLeftOutlineSvg';
import {ChevronBackSvg} from './ChevronBackSvg';

import {makeStyles, withStyles} from '@material-ui/styles';
import {useDevice} from '../DeviceProvider';

import {OS} from '../../types';
import {PanelHeaderBackProps} from './types';

const BackButton = withStyles({
  root: {border: 'none'},
  content: {padding: 0},
}, {name: 'PanelHeaderBackButton'})(Button);

const useStyles = makeStyles({
  root: {padding: 8},
  rootAndroid: {padding: 10, borderRadius: '50%'},
  icon: {display: 'block'},
}, {name: 'PanelHeaderBack'});

export const PanelHeaderBack = memo(
  function PanelHeaderBack(props: PanelHeaderBackProps) {
    const {iconProps = {}, buttonProps = {}} = props;
    const mc = useStyles(props);
    const {os} = useDevice();
    const isAndroid = os === OS.Android;
    const IconComponent = isAndroid
      ? ArrowLeftOutlineSvg
      : ChevronBackSvg;
    const {className: _iconClassName, ...restIconProps} = iconProps;
    const {className: _buttonClassName, ...restButtonProps} = buttonProps;

    const iconClassName = c(_iconClassName, mc.icon);
    const buttonClassName = c(
      mc.root,
      _buttonClassName,
      {[mc.rootAndroid]: isAndroid},
    );

    return (
      <RouterLink pop={true}>
        <BackButton
          className={buttonClassName}
          variant={'tertiary'}
          {...restButtonProps}
        >
          <IconComponent className={iconClassName} {...restIconProps}/>
        </BackButton>
      </RouterLink>
    );
  },
);
