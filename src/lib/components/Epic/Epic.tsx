import React, {memo} from 'react';

import {MountHistory} from '../MountHistory';
import {EpicInner} from './EpicInner';

import {epicMountHistoryContext} from './context';

import {EpicProps} from './types';

export const Epic = memo(function Epic(props: EpicProps) {
  const {activeView, children, ...rest} = props;

  return (
    <MountHistory activeElement={activeView} context={epicMountHistoryContext}>
      <EpicInner {...rest}>
        {children}
      </EpicInner>
    </MountHistory>
  );
});
