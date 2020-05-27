import {OS, DeviceProviderProps} from '../../lib';

export interface OSProviderContext {
  os: OS;
  setOS(os: OS): void;
}

export interface OSProviderProps extends DeviceProviderProps {
}
