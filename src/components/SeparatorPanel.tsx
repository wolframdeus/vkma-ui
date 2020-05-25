import React, {memo} from 'react';

import {makeStyles} from '@material-ui/styles';

import {PanelHeader, Separator} from '../lib';
import {Subtitle} from './Subtitle';
import {Controls} from './Controls';
import {SectionItem} from './SectionItem';

const useStyles = makeStyles({
  root: {
    padding: 18,
  },
});

export const SeparatorPanel = memo(function InputPanel() {
  const mc = useStyles();

  return (
    <>
      <PanelHeader backButton={true}>Separator</PanelHeader>
      <div className={mc.root}>
        <Controls/>
        <SectionItem>
          <Subtitle>With default margins</Subtitle>
          <Separator/>
        </SectionItem>
        <SectionItem>
          <Subtitle>Fill available width</Subtitle>
          <Separator fullWidth={true}/>
        </SectionItem>
      </div>
    </>
  );
});

