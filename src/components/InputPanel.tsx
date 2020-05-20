import React, {memo} from 'react';

import {makeStyles} from '@material-ui/styles';

import {PanelHeader, Input} from '../lib';
import {Subtitle} from './Subtitle';
import {Controls} from './Controls';

const useStyles = makeStyles({
  root: {
    padding: 18,
  },
});

export const InputPanel = memo(function InputPanel() {
  const mc = useStyles();

  return (
    <>
      <PanelHeader backButton={true}>Input</PanelHeader>
      <div className={mc.root}>
        <Controls/>
        <Subtitle>Example</Subtitle>
        <Input placeholder={'Your name'}/>
      </div>
    </>
  );
});

