import React from 'react'
import Mentor from '../components/mentor/Mentor'
import ProtectedRoute from '../components/ProtectedRoute'

const page = () => {
  return (
    <div>
      <ProtectedRoute>
        <Mentor />
      </ProtectedRoute>
    </div>
  )
}

export default page