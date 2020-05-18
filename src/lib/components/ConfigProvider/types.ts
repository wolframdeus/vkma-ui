import {ReactNode, ReactNodeArray} from 'react';
import {AppConfig, LaunchParams} from '../../types';

export interface ConfigContext {
  config: AppConfig;
  launchParams: LaunchParams;
}

export interface ConfigProviderProps {
  children: ReactNode | ReactNodeArray;

  /**
   * Application config sent from VKontakte
   * NOTE: It is recommended to use copied appConfig values in other providers.
   *  For example, appConfig contains property "insets" which defines current
   *  device insets. This property is correctly realised in DeviceProvider.
   *  Insets in appConfig are updated every time they changes even if virtual
   *  mobile keyboard is opened or closed. There are some other props which
   *  are realised in other providers and you have to use them instead of this
   *  one to make your code work more stable
   */
  config?: AppConfig;

  /**
   * Application launch parameters sent with search string in url from
   * VKontakte
   */
  launchParams?: LaunchParams;

  /**
   * Forces config provider to update automatically when bridge notifies
   */
  automaticUpdate?: boolean;
}
