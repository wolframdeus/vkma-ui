import React, {memo} from 'react';

import {Epic, View, Panel} from '../lib';
import {MainPanel} from './MainPanel';
import {ButtonPanel} from './ButtonPanel';
import {SelectPanel} from './SelectPanel';
import {InputPanel} from './InputPanel';
import {ViewExamplePanel} from './ViewExamplePanel';
import {SeparatorPanel} from './SeparatorPanel';

import {useRouter} from 'vkma-router';
import {PanelsEnum, ViewsEnum} from '../types';
import {PopupsPanel} from './PopupsPanel';

export const Inner = memo(function Inner() {
  const router = useRouter();

  if (!router) {
    return null;
  }
  const {currentState} = router;

  return (
    <Epic activeView={currentState.view}>
      <View id={ViewsEnum.Presentation} activePanel={currentState.panel}>
        <Panel id={PanelsEnum.Button} component={ButtonPanel}/>
        <Panel id={PanelsEnum.Input} component={InputPanel}/>
        <Panel id={PanelsEnum.Main} component={MainPanel}/>
        <Panel id={PanelsEnum.Popups} component={PopupsPanel}/>
        <Panel id={PanelsEnum.Select} component={SelectPanel}/>
        <Panel id={PanelsEnum.Separator} component={SeparatorPanel}/>
      </View>
      <View
        id={ViewsEnum.PresentationViewExample}
        activePanel={currentState.panel}
      >
        <Panel id={PanelsEnum.Main} component={ViewExamplePanel}/>
      </View>
    </Epic>
  );
});
