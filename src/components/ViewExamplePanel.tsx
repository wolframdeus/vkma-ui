import React, {memo} from 'react';

import {makeStyles} from '@material-ui/styles';

import {PanelHeader, Link} from '../lib';
import {Controls} from './Controls';
import {RouterLink} from 'vkma-router';

const useStyles = makeStyles({
  root: {
    padding: 18,
  },
});

export const ViewExamplePanel = memo(function ViewExamplePanel() {
  const mc = useStyles();

  return (
    <>
      <PanelHeader backButton={true}>View example</PanelHeader>
      <div className={mc.root}>
        <Controls/>
        It is some new view. You can{' '}
        <RouterLink pop={true}>
          <Link>go back</Link>
        </RouterLink>{' '}
        now.
      </div>
    </>
  );
});

