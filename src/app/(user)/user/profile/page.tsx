import ProfileSettingsForm from '@/components/ProfileSettingsForm'
import UserNavigate from '@/components/UserNavigate'
import React from 'react'


function Profile() {
  return (
    <div className="flex bg-white">
          <UserNavigate />
          <div className=" p-2 w-2/3">
          <ProfileSettingsForm/>
          </div>
        </div>
  )
}

export default Profile