import {
  DefaultUpdateConfigData,
  MVKUpdateConfigData,
} from '@vkontakte/vk-bridge';

export interface PreparedMVKAppConfig
  extends Omit<MVKUpdateConfigData, 'viewport_width' | 'viewport_height'> {
  viewportWidth: number;
  viewportHeight: number;
}

export interface PreparedDefaultAppConfig
  extends Omit<DefaultUpdateConfigData, 'app_id'> {
  appId: string;
}

/**
 * Formatted application config from VKontakte
 */
export type AppConfig = PreparedMVKAppConfig & PreparedDefaultAppConfig;
