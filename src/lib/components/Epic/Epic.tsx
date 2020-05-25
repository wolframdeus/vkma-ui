import React, {Children, memo} from 'react';

import {Suspender} from '../Suspender';
import {ViewTransition} from '../ViewTransition';

import {EpicProps} from './types';

export const Epic = memo(function Epic(props: EpicProps) {
  const {children, activeView, animate = true} = props;
  const childrenArr = Children.map(children, c => (
    <ViewTransition id={c.props.id}>{c}</ViewTransition>
  ));

  return (
    <Suspender activeElement={activeView} animate={animate}>
      {childrenArr}
    </Suspender>
  );
});
