import React, {
  memo,
  useState,
  useRef,
  useMemo,
} from 'react';

import {useEffectIfMounted} from '../../hooks';
import {suspenderContext} from './context';

import {
  SuspendHistoryActionType,
  SuspenderContext,
  SuspenderProps,
} from './types';

const {Provider} = suspenderContext;

export const Suspender = memo(function Suspender(props: SuspenderProps) {
  const {activeElement: parentActiveElement, children, animate = true} = props;

  // All previously mounted elements
  const [mountedElements, setMountedElements] = useState([parentActiveElement]);

  // We do memoize active element due to we are unable to refresh parent
  // activeElement and enterType synchronously, thanks to useEffect
  const [activeElement, setActiveElement] = useState(parentActiveElement);

  // Previously mounted elements. Required to detect componentType
  const mountHistoryRef = useRef([parentActiveElement]);
  const [lastHistoryAction, setLastHistoryAction] =
    useState<SuspendHistoryActionType>('push');
  const [lastPopedElement, setLastPopedElement] =
    useState<string | null>(null);

  useEffectIfMounted(() => {
    const mountHistory = mountHistoryRef.current;
    const mountedLast = mountHistory[mountHistory.length - 1];
    const mountedBeforeLast = mountHistory[mountHistory.length - 2];

    // If active element does not differ from last one, it means history
    // was not changed
    if (mountedLast !== parentActiveElement) {
      setLastPopedElement(mountedLast);

      // If mounted component before the last one is equal to new active
      // element, it means history pop was called
      if (mountedBeforeLast && mountedBeforeLast === parentActiveElement) {
        setLastHistoryAction('pop');
        mountHistoryRef.current =
          mountHistory.slice(0, mountHistory.length - 1);
      } else {
        setLastHistoryAction('push');
        mountHistoryRef.current = [...mountHistory, parentActiveElement];
      }
    }

    // Add new activeElement to previously mounted elements
    setMountedElements(mountedElements => {
      return mountedElements.includes(parentActiveElement)
        ? mountedElements
        : [...mountedElements, parentActiveElement];
    });

    // Update internal active element
    setActiveElement(parentActiveElement);
  }, [parentActiveElement]);

  const context = useMemo<SuspenderContext>(() => ({
    activeElement,
    lastPopedElement,
    lastHistoryAction,
    mountedElements,
    animate,
  }), [
    activeElement, lastPopedElement, lastHistoryAction, mountedElements,
    animate,
  ]);

  return <Provider value={context}>{children}</Provider>;
});
