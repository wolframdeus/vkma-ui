import {createContext, useContext} from 'react';
import {SuspenderContext} from './types';

export const suspenderContext = createContext<SuspenderContext | null>(null);
export const useSuspender = () => useContext(suspenderContext);

suspenderContext.displayName = 'SuspenderContext';
