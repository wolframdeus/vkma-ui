import React, {memo} from 'react';

import {makeStyles} from '@material-ui/styles';

import {Theme, PanelHeader, Link} from '../lib';
import {RouterLink} from './RouterLink';
import {Controls} from './Controls';
import {SectionItem} from './SectionItem';
import {Subtitle} from './Subtitle';

import {PanelsEnum, ViewsEnum} from '../types';


const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: 18,
  },
  link: {
    display: 'block',

    '& + &': {
      marginTop: 10,
    },
  },
  topText: {
    marginBottom: 40,
  },
}));

export const MainPanel = memo(function MainPanel() {
  const mc = useStyles();

  return (
    <>
      <PanelHeader>Components</PanelHeader>
      <div className={mc.root}>
        <Controls/>
        <div className={mc.topText}>
          Here is a playground where you can try components realised in this
          template.
        </div>
        <SectionItem>
          <Subtitle>Miscellaneous</Subtitle>
          <RouterLink
            to={{
              view: ViewsEnum.PresentationViewExample,
              panel: PanelsEnum.Main,
            }}
          >
            <Link className={mc.link}>Open new view</Link>
          </RouterLink>
        </SectionItem>
        <SectionItem>
          <Subtitle>Components</Subtitle>
          <RouterLink
            to={{view: ViewsEnum.Presentation, panel: PanelsEnum.Button}}
          >
            <Link className={mc.link}>Button</Link>
          </RouterLink>
          <RouterLink
            to={{view: ViewsEnum.Presentation, panel: PanelsEnum.Select}}
          >
            <Link className={mc.link}>Select</Link>
          </RouterLink>
          <RouterLink
            to={{view: ViewsEnum.Presentation, panel: PanelsEnum.Input}}
          >
            <Link className={mc.link}>Input</Link>
          </RouterLink>
          <RouterLink
            to={{view: ViewsEnum.Presentation, panel: PanelsEnum.Separator}}
          >
            <Link className={mc.link}>Separator</Link>
          </RouterLink>
        </SectionItem>
      </div>
    </>
  );
});

