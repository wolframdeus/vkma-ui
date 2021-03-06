import {ComponentType} from 'react';
import {MountableProps, ViewProps, PanelProps} from '../lib';
import {IdType} from 'vkma-router';

/**
 * Map where key has id type and value is passed type
 */
type Tree<T> = {
  [Id in IdType]: T;
};

/**
 * Panel in a tree
 */
interface TreePanel extends MountableProps {
  /**
   * Component which will be used instead of default "Panel"
   */
  as?: ComponentType<PanelProps>;
  /**
   * Does panel contains header
   */
  header?: PanelProps['header'];
  /**
   * Component which should be rendered inside panel
   */
  component: PanelProps['component'];
}

/**
 * View in a tree
 */
export interface TreeView extends MountableProps {
  /**
   * Component which will be used instead of default "View"
   */
  as?: ComponentType<ViewProps>;
  /**
   * List of view panels
   */
  panels: Tree<TreePanel>;
}

/**
 * Describes views tree
 */
export type ViewsTree = Tree<TreeView>;

/**
 * List of available views in project. Required to avoid routing to
 * non-existing views
 */
export enum ViewsEnum {
  Presentation = 'presentation',
  PresentationViewExample = 'presentation-view-example',
}

/**
 * List of available panels in project. Required to avoid routing to
 * non-existing panel
 */
export enum PanelsEnum {
  Button = 'button',
  Input = 'input',
  Main = 'main',
  Popups = 'popups',
  Select = 'select',
  Separator = 'separator',
}

/**
 * List of available popups in project. Required to avoid routing to
 * non-existing popup
 */
export enum PopupsEnum {
  Main = 'main',
}
