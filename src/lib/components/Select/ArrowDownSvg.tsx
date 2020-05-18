import React, {memo, SVGProps} from 'react';

export const ArrowDownSvg = memo((props: SVGProps<SVGSVGElement>) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <g fill="none" fillRule="evenodd">
        <path d="M0 0h24v24H0z"/>
        <path
          d="M12 14.198L6.64 9.732a1 1 0 10-1.28 1.536l6 5a1 1 0 001.28 0l6-5a1 1 0 10-1.28-1.536L12 14.198z"
          fill="currentColor"
          fillRule="nonzero"
        />
      </g>
    </svg>
  );
});
