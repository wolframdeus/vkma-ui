import {createSuspenderTransitionComponent} from '../SuspenderTransition';

import {
  createPanelActivePhaseTransitionGenerator,
  createPanelStartPhaseTransitionGenerator,
} from './utils';
import {
  PANEL_TRANSITION_ANDROID_DURATION,
  PANEL_TRANSITION_IOS_DURATION,
} from './constants';

const [Component, useContext] = createSuspenderTransitionComponent({
  displayName: 'PanelTransition',
  createActivePhaseTransitionGenerator: createPanelActivePhaseTransitionGenerator,
  createStartPhaseTransitionGenerator: createPanelStartPhaseTransitionGenerator,
  iosDuration: PANEL_TRANSITION_IOS_DURATION,
  androidDuration: PANEL_TRANSITION_ANDROID_DURATION,
});

export const PanelTransition = Component;
export const usePanelTransition = useContext;
