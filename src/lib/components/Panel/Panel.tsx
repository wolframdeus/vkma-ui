import React, {memo} from 'react';

import {PanelTransition} from '../PanelTransition';
import {PanelInner} from './PanelInner';

import {PanelProps} from './types';

export const Panel = memo(function Panel(props: PanelProps) {
  return (
    <PanelTransition id={props.id}>
      <PanelInner {...props}/>
    </PanelTransition>
  );
});
