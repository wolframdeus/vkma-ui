import React, {memo, useCallback, useMemo, useState} from 'react';

import {MountHistory} from '../MountHistory';

import {popupRootContext, popupRootMountHistoryContext} from './context';

import {PopupRootContextCore, PopupRootProps} from './types';

const {Provider} = popupRootContext;

export const PopupRoot = memo(function PopupRoot(props: PopupRootProps) {
  const {defaultPopup = null, children} = props;

  // List of mounted popups
  const [mountedPopups, setMountedPopups] = useState(
    defaultPopup === null ? [] : [defaultPopup],
  );

  // Removes popup from list of mounted popups
  const unmountPopup = useCallback((id: string) => {
    setMountedPopups(mountedPopups => mountedPopups.includes(id)
      ? mountedPopups.filter(popupId => popupId !== id)
      : mountedPopups);
  }, []);

  // Adds popup to list of mounted popups
  const mountPopup = useCallback((id: string) => {
    setMountedPopups(mountedPopups => mountedPopups.includes(id)
      ? mountedPopups
      : [...mountedPopups, id],
    );
  }, []);

  const activePopup = useMemo(() => {
    return mountedPopups[mountedPopups.length - 1] || null;
  }, [mountedPopups]);

  const context = useMemo<PopupRootContextCore>(() => ({
    mountPopup,
    unmountPopup,
  }), [unmountPopup, mountPopup]);

  return (
    <Provider value={context}>
      <MountHistory
        activeElement={activePopup}
        context={popupRootMountHistoryContext}
      >
        {children}
      </MountHistory>
    </Provider>
  );
});
