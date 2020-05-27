import React, {memo, useMemo, useState} from 'react';

import {DeviceProvider, getOS} from '../../lib';
import {osProviderContext} from './context';

import {OSProviderContext, OSProviderProps} from './types';

const {Provider} = osProviderContext;

/**
 * NOTE: For test purposes only. Dont use in production!
 * @type {React.NamedExoticComponent<OSProviderProps>}
 */
export const OSProvider = memo(function OSProvider(props: OSProviderProps) {
  const {os: parentOS, ...rest} = props;

  const [os, setOS] = useState(parentOS || getOS(window.navigator.userAgent));

  const context = useMemo<OSProviderContext>(() => ({
    os,
    setOS,
  }), [os]);

  return (
    <Provider value={context}>
      <DeviceProvider os={os} {...rest}/>
    </Provider>
  );
});
