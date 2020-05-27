import {createMountTransition} from '../../utils/createMountTransition';
import {
  PANEL_TRANSITION_IOS_DURATION, PANEL_TRANSITION_ANDROID_DURATION,
} from './constants';

import {
  createPanelActivePhaseTransitionGenerator,
  createPanelStartPhaseTransitionGenerator,
} from './utils';
import {viewMountHistoryContext} from '../View/context';

const [Component, useContext] = createMountTransition({
  displayName: 'PanelTransition',
  styles: theme => ({
    appear: {},
    appearActive: {},
    appearDone: {},
    enter: createPanelStartPhaseTransitionGenerator(theme, 'enter'),
    enterActive: createPanelActivePhaseTransitionGenerator(theme, 'enter'),
    enterDone: {},
    exit: createPanelStartPhaseTransitionGenerator(theme, 'exit'),
    exitActive: createPanelActivePhaseTransitionGenerator(theme, 'exit'),
    exitDone: {},
  }),
  mountHistoryContext: viewMountHistoryContext,
  iosTimeout: PANEL_TRANSITION_IOS_DURATION,
  androidTimeout: PANEL_TRANSITION_ANDROID_DURATION,
});

export const PanelTransition = Component;
export const usePanelTransition = useContext;
