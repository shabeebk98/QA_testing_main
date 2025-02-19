import React from 'react'
import CompanyReprtv from '../components/companyrepresentative/CompanyReprtv'
import ProtectedRoute from '../components/ProtectedRoute'

const page = () => {
  return (
    <div>
      <ProtectedRoute>
        <CompanyReprtv />
      </ProtectedRoute>
    </div>
  )
}

export default page