"use client";

import ProfileSettingsForm from "@/components/ProfileSettingsForm";
import UserNavigate from "@/components/UserNavigate";
import { getCurrentUser } from "@/libs/authService";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

function Profile() {
  const { data: session } = useSession();
  const [userProfile, setUserProfile] = useState<any>(undefined);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getCurrentUser((session as any)?.token);
      setUserProfile(user);
    };
    fetchUser();
  }, []);
  return (
    <div className="flex">
      <UserNavigate />
      {(userProfile &&

        <div className=" p-2 w-2/3">
          <ProfileSettingsForm
            email={userProfile.data.user.email || "Email not available"}
            name={userProfile.data.user.name || "Name not available"}
            tel={userProfile.data.user.tel || "Phone not available"}
          />
        </div>
      )}
    </div>
  );
}

export default Profile;
