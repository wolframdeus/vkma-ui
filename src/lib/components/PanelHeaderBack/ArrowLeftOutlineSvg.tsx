import React, {memo, SVGProps} from 'react';

export const ArrowLeftOutlineSvg = memo((props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      height="28"
      width="28"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 28 28"
    >
      <g fill="none" fillRule="evenodd">
        <path d="M28 0H0v28h28z"/>
        <path
          d="M12.293 6.293a1 1 0 011.414 1.414L8.414 13H22a1 1 0 01.993.883L23 14a1 1 0 01-1 1H8.414l5.293 5.293a1 1 0 01.083 1.32l-.083.094a1 1 0 01-1.414 0l-7-7-.073-.082A1.005 1.005 0 015 14l.004.09A1.006 1.006 0 015 14.02V14a1.02 1.02 0 01.125-.484.878.878 0 01.071-.111.999.999 0 01.097-.112l-.08.09c.025-.031.051-.062.08-.09z"
          fill="currentColor"
          fillRule="nonzero"
        />
      </g>
    </svg>
  );
});
