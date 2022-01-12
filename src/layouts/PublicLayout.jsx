import React, { Suspense } from 'react';
import Loading from '../components/Loading';

const PublicLayout = ({ children }) => {
  return (
    <div className="main">
      <Suspense fallback={<Loading loading={true} className="u-text-center" />}>
        {children}
      </Suspense>
    </div>
  );
};

export default PublicLayout;
