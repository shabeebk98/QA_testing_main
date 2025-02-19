import React from 'react'
import Student from '../components/student/Student'
import ProtectedRoute from '../components/ProtectedRoute'

const page = () => {
  return (
    <div>
      <ProtectedRoute>
        <Student />
      </ProtectedRoute>
    </div>
  )
}

export default page