import React from 'react'
import Teacher from '../components/teacher/Teacher'
import ProtectedRoute from '../components/ProtectedRoute'

const page = () => {
  return (
    <div>
      <ProtectedRoute>
        <Teacher />
      </ProtectedRoute>
    </div>
  )
}

export default page
