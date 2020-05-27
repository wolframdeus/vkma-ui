import {Context, createContext} from 'react';
import {MountHistoryContext} from './types';

export function createMountHistoryContext(displayName: string): Context<MountHistoryContext> {
  const context = createContext<MountHistoryContext>({
    activeElement: null,
    previouslyMountedElements: [],
    mountHistory: [],
    lastAction: 'push',
    lastPopedElement: null,
  });
  context.displayName = displayName;

  return context;
}
