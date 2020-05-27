import {createMountTransition} from '../../utils/createMountTransition';
import {epicMountHistoryContext} from '../Epic';
import {
  VIEW_TRANSITION_ANDROID_DURATION,
  VIEW_TRANSITION_IOS_DURATION,
} from './constants';

import {
  createViewActivePhaseTransitionGenerator,
  createViewStartPhaseTransitionGenerator,
} from './utils';

const [Component, useContext] = createMountTransition({
  displayName: 'ViewTransition',
  styles: theme => ({
    appear: {},
    appearActive: {},
    appearDone: {},
    enter: createViewStartPhaseTransitionGenerator(theme, 'enter'),
    enterActive: createViewActivePhaseTransitionGenerator(theme, 'enter'),
    enterDone: {},
    exit: createViewStartPhaseTransitionGenerator(theme, 'exit'),
    exitActive: createViewActivePhaseTransitionGenerator(theme, 'exit'),
    exitDone: {},
  }),
  mountHistoryContext: epicMountHistoryContext,
  iosTimeout: VIEW_TRANSITION_IOS_DURATION,
  androidTimeout: VIEW_TRANSITION_ANDROID_DURATION,
});

export const ViewTransition = Component;
export const useViewTransition = useContext;
