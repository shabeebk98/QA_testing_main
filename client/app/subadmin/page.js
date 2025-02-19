import React from 'react'
import Subadmin from '../components/subadmin/Subadmin'
import ProtectedRoute from '../components/ProtectedRoute'

const page = () => {
  return (
    <div>
      <ProtectedRoute>
        <Subadmin />
      </ProtectedRoute>
    </div>
  )
}

export default page