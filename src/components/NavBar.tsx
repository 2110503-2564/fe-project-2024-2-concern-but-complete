'use client'

import {
  UserResponse
} from "@/app/api/auth/[...nextauth]/authOptions";
import { Bed, CircleUserRound, LogOut, Wrench } from "lucide-react";
import { Session } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const LoginToolBar = ({ session }: { session: Session | null }) => {
  return session ? (
    <span className="flex items-center gap-1">
      <Link href={'/user'} className="flex items-center gap-1 hover:bg-secondary py-2 px-3 rounded-md transition-colors">
        <CircleUserRound />
        <span>{session.user?.name}</span>
        {(session.user as UserResponse)?.isAdmin && (
          <span className="bg-bg text-text px-1 rounded-md">Admin</span>
        )}
      </Link>
      <button onClick={() => signOut({callbackUrl: '/'})} className="hover:bg-secondary py-2 pl-2 pr-3 rounded-md transition-colors">
        <LogOut className="ml-2" />
      </button>
    </span>
  ) : (
    <div className="flex items-center gap-2">
      <Link
        href="/api/auth/signin"
        className="p-2 border-2 border-bg rounded-md"
      >
        Login
      </Link>
      <Link
        href="/api/auth/signup"
        className="p-2 border-2 border-bg rounded-md bg-bg text-primary"
      >
        SignUp
      </Link>
    </div>
  );
};

const NavBarItem = ({
  icon,
  text,
  hidden,
  pageRef,
}: {
  icon: React.ReactNode;
  text: string;
  hidden?: boolean;
  pageRef: string;
}) => {
  return (
    !hidden && (
      <Link
        className="flex items-center gap-2 hover:bg-secondary py-2 px-3 rounded-md transition-colors"
        href={pageRef}
      >
        {icon}
        <span>{text}</span>
      </Link>
    )
  );
};

const NavBar = () => {
  const {data: session} = useSession();

  return (
    <nav className="bg-primary h-12 flex items-center px-2 text-bg text-sm gap-4">
      <span className="mx-4 font-bold">CBC Hotels</span>
      <div className="flex-grow flex items-center h-full justify-end gap-2">
        <NavBarItem icon={<Bed />} text="Hotels" pageRef="/hotels" />
        <NavBarItem
          icon={<Wrench />}
          text="Dashboard"
          pageRef="/admin"
          hidden={!session || !(session.user as UserResponse).isAdmin}
        />
        <LoginToolBar session={session} />
      </div>
    </nav>
  );
};

export default NavBar;
