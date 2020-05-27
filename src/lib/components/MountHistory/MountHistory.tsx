import React, {memo, useMemo, useState} from 'react';

import {useEffectIfMounted} from '../../hooks';

import {
  MountHistoryActionType,
  MountHistoryContext,
  MountHistoryProps,
} from './types';

export const MountHistory = memo(function MountHistory(props: MountHistoryProps) {
  const {activeElement: parentActiveElement, children, context} = props;

  // Previously mounted elements
  const [previouslyMountedElements, setPreviouslyMountedElements] = useState(
    parentActiveElement === null ? [] : [parentActiveElement],
  );

  // We do memoize active element due to we are unable to refresh parent
  // activeElement and enterType synchronously, thanks to useEffect
  const [activeElement, setActiveElement] = useState(parentActiveElement);

  // Elements mount history
  const [mountHistory, setMountHistory] = useState([parentActiveElement]);

  // Last history action
  const [lastAction, setLastHistoryAction] =
    useState<MountHistoryActionType>('push');

  // Last poped element from history
  const [lastPopedElement, setLastPopedElement] =
    useState<string | null>(null);

  useEffectIfMounted(() => {
    // Update mount history
    setMountHistory(mountHistory => {
      const mountedLast = mountHistory[mountHistory.length - 1];

      // If active element does not differ from last one, it means history
      // was not changed
      if (mountedLast === parentActiveElement) {
        return mountHistory;
      }
      const mountedBeforeLast = mountHistory[mountHistory.length - 2];

      // Update last poped element
      setLastPopedElement(mountedLast);

      // If mounted component before the last one is equal to new active
      // element, it means history pop was called
      if (mountedBeforeLast && mountedBeforeLast === parentActiveElement) {
        setLastHistoryAction('pop');
        return mountHistory.slice(0, mountHistory.length - 1);
      }

      // Otherwise it was push
      setLastHistoryAction(parentActiveElement === null ? 'pop' : 'push');
      return [...mountHistory, parentActiveElement];
    });

    // Add new activeElement to previously mounted elements
    if (parentActiveElement !== null) {
      setPreviouslyMountedElements(mountedElements => {
        return mountedElements.includes(parentActiveElement)
          ? mountedElements
          : [...mountedElements, parentActiveElement];
      });
    }

    // Update internal active element
    setActiveElement(parentActiveElement);
  }, [parentActiveElement]);

  const contextValue = useMemo<MountHistoryContext>(() => ({
    activeElement, previouslyMountedElements, mountHistory, lastAction,
    lastPopedElement,
  }), [
    activeElement, previouslyMountedElements, mountHistory, lastAction,
    lastPopedElement,
  ]);

  const {Provider} = context;

  return <Provider value={contextValue}>{children}</Provider>;
});
