/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, { forwardRef } from 'react';
import { Helmet } from 'react-helmet';

interface PageProps {
  title?: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Page = forwardRef<PageProps, any>(({ children, title, ...rest }, ref) => {
  return (
    <div ref={ref} {...rest}>
      <Helmet>
        <title>Sensing Sugar{title && ` - ${title}`}</title>
      </Helmet>
      {children}
    </div>
  );
});

export default Page;
