import React, {memo, useEffect, useMemo, useState} from 'react';

import {deviceContext} from './context';
import {getInsets, getOS} from './utils';
import vkBridge, {VKBridgeSubscribeHandler} from '@vkontakte/vk-bridge';
import {shallowEqual} from '../../utils';

import {DeviceContext, DeviceProviderProps} from './types';

const {Provider} = deviceContext;

export const DeviceProvider = memo(
  function DeviceProvider(props: DeviceProviderProps) {
    const {
      children, currentInsets: parentCurrentInsets, insets: parentInsets,
      os: parentOS, automaticUpdate,
    } = props;

    const os = useMemo(() => {
      return parentOS || getOS(window.navigator.userAgent);
    }, [parentOS]);

    const insets = useMemo(() => {
      return parentInsets || getInsets();
    }, [parentInsets]);

    const [currentInsets, setCurrentInsets] = useState(() => {
      return parentCurrentInsets || insets;
    });

    const context = useMemo<DeviceContext>(() => ({
      os,
      insets,
      currentInsets,
    }), [os, insets, currentInsets]);

    // If automatic update is required, listen to incoming events and wait
    // for VKWebAppUpdateConfig or VKWebAppUpdateInsets event
    useEffect(() => {
      if (automaticUpdate) {
        const listener: VKBridgeSubscribeHandler = event => {
          if (
            event.detail?.type === 'VKWebAppUpdateConfig' ||
            event.detail?.type === 'VKWebAppUpdateInsets'
          ) {
            const {data} = event.detail;

            if ('insets' in data) {
              // Update current insets in case, they differ
              setCurrentInsets(currentInsets => {
                return shallowEqual(currentInsets, data.insets)
                  ? currentInsets
                  : data.insets;
              });
            }
          }
        };
        vkBridge.subscribe(listener);

        return () => vkBridge.unsubscribe(listener);
      }
    }, [automaticUpdate]);

    return <Provider value={context}>{children}</Provider>;
  },
);
