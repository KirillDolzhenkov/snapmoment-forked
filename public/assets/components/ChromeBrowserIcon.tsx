import * as React from 'react';
import { Ref, SVGProps, forwardRef } from 'react';
const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg fill={'none'} height={36} ref={ref} width={36} xmlns={'http://www.w3.org/2000/svg'} {...props}>
    <path
      d={
        'M6.007 4.577A17.933 17.933 0 0 1 18 0c6.908 0 12.907 3.89 15.924 9.6H18a8.402 8.402 0 0 0-7.751 5.158L6.007 4.577Z'
      }
      fill={'#fff'}
    />
    <path
      d={
        'M4.19 6.455A17.928 17.928 0 0 0 0 18c0 7.978 5.188 14.742 12.375 17.104l6.746-8.778a8.403 8.403 0 0 1-9.31-6.445 1.203 1.203 0 0 1-.119-.22L4.189 6.456ZM14.915 35.737A18.14 18.14 0 0 0 18 36c9.942 0 18-8.058 18-18 0-2.108-.363-4.132-1.029-6.012A1.213 1.213 0 0 1 34.8 12H23.879a8.374 8.374 0 0 1 2.52 6 8.37 8.37 0 0 1-2.259 5.732l-.029.04-9.196 11.965Z'
      }
      fill={'#fff'}
    />
    <path d={'M12 18a6 6 0 1 1 12 0 6 6 0 0 1-12 0Z'} fill={'#fff'} />
  </svg>
);
const ForwardRef = forwardRef(SvgComponent);

export default ForwardRef;