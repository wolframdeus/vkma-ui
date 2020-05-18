import React, {memo} from 'react';

import {useDevice} from '../DeviceProvider';

import {ThemeProviderConnectedProps} from './types';
import {ThemeProvider} from './ThemeProvider';

/**
 * Connected to DeviceProvider ThemeProvider
 * @type {React.NamedExoticComponent<ThemeProviderProps>}
 */
export const ThemeProviderConnected = memo(
  function ThemeProviderConnected(props: ThemeProviderConnectedProps) {
    const {os} = useDevice();

    return <ThemeProvider {...props} os={os}/>;
  },
);
