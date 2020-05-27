import React, {memo} from 'react';

import {makeStyles} from '@material-ui/styles';

import {PanelHeader} from '../lib';
import {Subtitle} from './Subtitle';
import {Controls} from './Controls';

const useStyles = makeStyles({
  root: {
    padding: 18,
  },
});

export const PopupsPanel = memo(function InputPanel() {
  const mc = useStyles();

  return (
    <>
      <PanelHeader backButton={true}>Popup</PanelHeader>
      <div className={mc.root}>
        <Controls/>
          <Subtitle>With default margins</Subtitle>
          {/*<RouterLink/>*/}
      </div>
    </>
  );
});

