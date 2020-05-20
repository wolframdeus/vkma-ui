import React, {memo} from 'react';

import {Suspender} from '../Suspender';

import {EpicProps} from './types';

export const Epic = memo(function Epic(props: EpicProps) {
  const {children, activeView, animate = true} = props;

  return (
    <Suspender activeElement={activeView} animate={animate}>
      {children}
    </Suspender>
  );
});
