import React, {memo, useEffect, useMemo, useState} from 'react';

import {configContext} from './context';
import {getLaunchParams, prepareAppConfig} from './utils';
import vkBridge from '@vkontakte/vk-bridge';

import {ConfigContext, ConfigProviderProps} from './types';
import {AppConfig, LaunchParams} from '../../types';
import {VKBridgeSubscribeHandler} from '@vkontakte/vk-bridge';

const {Provider} = configContext;

export const ConfigProvider = memo(
  function ConfigProvider(props: ConfigProviderProps) {
    const {
      children, config: parentConfig, launchParams: parentLaunchParams,
      automaticUpdate,
    } = props;

    const [config, setConfig] = useState<AppConfig>(() => {
      return parentConfig || {
        app: 'vkclient',
        appId: '',
        appearance: 'light',
        scheme: 'client_light',
        insets: {top: 0, bottom: 0, left: 0, right: 0},
        viewportHeight: 0,
        viewportWidth: 0,
      };
    });

    const launchParams = useMemo<LaunchParams>(() => {
      return parentLaunchParams
        || getLaunchParams(window.location.search.slice(1));
    }, [parentLaunchParams]);

    const context = useMemo<ConfigContext>(
      () => ({config, launchParams}), [config, launchParams],
    );

    // If automatic update is required, listen to incoming events and wait
    // for VKWebAppUpdateConfig or VKWebAppUpdateInsets event
    useEffect(() => {
      if (automaticUpdate) {
        const listener: VKBridgeSubscribeHandler = event => {
          if (
            event.detail?.type === 'VKWebAppUpdateConfig' ||
            event.detail?.type === 'VKWebAppUpdateInsets'
          ) {
            const prepared = prepareAppConfig(event.detail.data);
            setConfig(config => ({...config, ...prepared}));
          }
        };
        vkBridge.subscribe(listener);

        return () => vkBridge.unsubscribe(listener);
      }
    }, [automaticUpdate]);

    // If config is changed from outside, update internal value
    useEffect(() => {
      if (parentConfig) {
        setConfig(parentConfig);
      }
    }, [parentConfig]);

    return <Provider value={context}>{children}</Provider>;
  },
);
