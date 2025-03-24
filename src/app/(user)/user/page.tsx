import Dashboard from '@/components/Dashboard'
import UserNavigate from '@/components/UserNavigate'
import React from 'react'

function user() {
  return (
    <div className="flex">
      <UserNavigate />
      <div className=" p-2 w-2/3">
        <Dashboard />
      </div>
    </div>
  );
}

export default user