import { generateMetadata } from './metatag';

import ApartmentPage from '@/component/modules/ApartmentLayout/apartmentPage'
import React from 'react'

export { generateMetadata };

const page = () => {
  return (
   <>
    <ApartmentPage />
   </>
  )
}

export default page
