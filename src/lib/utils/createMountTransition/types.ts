import {
  MountTransitionProps,
  MountTransitionType,
} from '../../components/MountTransition/types';
import {OS} from '../../types';
import {StyleRules} from '@material-ui/styles';
import {CSSTransitionClassNames} from 'react-transition-group/CSSTransition';
import {Theme} from '../../components/ThemeProvider';
import {Context, NamedExoticComponent} from 'react';
import {MountHistoryContext} from '../../components/MountHistory';

export interface CustomTransitionStylesProps {
  /**
   * Transition type
   */
  transitionType: MountTransitionType;

  /**
   * Operating system
   */
  os: OS;
}

type TransitionStyleRules = StyleRules<CustomTransitionStylesProps, keyof CSSTransitionClassNames>;
type TransitionStylesType =
  | TransitionStyleRules
  | ((theme: Theme) => TransitionStyleRules);

export interface CreateMountTransitionOptions {
  /**
   * Component display name. Also applied to component context
   */
  displayName?: string;

  /**
   * Context from where created transition could take required meta params
   */
  mountHistoryContext: Context<MountHistoryContext>;

  /**
   * Styles required to create styles hook and apply to MountTransition
   */
  styles: TransitionStylesType;

  /**
   * Timeout in IOS
   */
  iosTimeout: number;

  /**
   * Timeout in Android
   */
  androidTimeout: number;
}

export interface CustomMountTransitionContext {
  /**
   * States if transition is currently running
   */
  isTransitioning: boolean;
}

export interface CustomMountTransitionProps
  extends Omit<MountTransitionProps, 'isMountedBefore' | 'in' | 'classNames'
    | 'timeout'> {
  /**
   * Unique element identifier
   */
  id: string;
}

type CustomTransitionComponent = NamedExoticComponent<CustomMountTransitionProps>;
type UseContext = () => CustomMountTransitionContext;
export type CreateMountTransitionTuple = [CustomTransitionComponent, UseContext];
