import React, {memo, SVGProps} from 'react';

export const ChevronBackSvg = memo((props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="28"
      viewBox="0 0 20 28"
    >
      <g fill="none" fillRule="evenodd">
        <path d="M0 0h20v28H0z"/>
        <path
          d="M4.56 12.94L13 4.5a1.414 1.414 0 012 2L7.5 14l7.5 7.5a1.414 1.414 0 01-2 2l-8.44-8.44a1.5 1.5 0 010-2.12z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
});
