import { generateMetadata } from './metadata';

import React from 'react';
import NewroomPage from '@/component/modules/newsroom/parts/newroomPage';

export { generateMetadata };

const page = ({ params }) => {
 
  return (
  <>
    <NewroomPage params={params} />
  </>
  );
};

export default page;
