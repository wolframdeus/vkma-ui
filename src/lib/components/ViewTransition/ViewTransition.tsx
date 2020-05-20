import {createSuspenderTransitionComponent} from '../SuspenderTransition';

import {
  createViewActivePhaseTransitionGenerator,
  createViewStartPhaseTransitionGenerator,
} from './utils';
import {
  VIEW_TRANSITION_ANDROID_DURATION,
  VIEW_TRANSITION_IOS_DURATION,
} from './constants';

const [Component, useContext] = createSuspenderTransitionComponent({
  displayName: 'ViewTransition',
  createActivePhaseTransitionGenerator: createViewActivePhaseTransitionGenerator,
  createStartPhaseTransitionGenerator: createViewStartPhaseTransitionGenerator,
  iosDuration: VIEW_TRANSITION_IOS_DURATION,
  androidDuration: VIEW_TRANSITION_ANDROID_DURATION,
});

export const ViewTransition = Component;
export const useViewTransition = useContext;
