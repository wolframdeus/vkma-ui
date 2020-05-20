import React, {memo} from 'react';

import {ViewInner} from './ViewInner';
import {ViewTransition} from '../ViewTransition';

import {ViewProps} from './types';

export const View = memo(function View(props: ViewProps) {
  return (
    <ViewTransition id={props.id}>
      <ViewInner {...props}/>
    </ViewTransition>
  );
});
