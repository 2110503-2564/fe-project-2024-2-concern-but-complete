import { Bed, CircleUserRound, LogOut } from "lucide-react";
import Link from "next/link";

const LoginToolBar = ({
  loggedIn,
  isAdmin,
  userName,
}: {
  loggedIn?: boolean;
  isAdmin?: boolean;
  userName: string;
}) => {
  return loggedIn ? (
    <span className="flex items-center gap-1">
      <CircleUserRound />
      <span>{userName}</span>
      {isAdmin && (
        <span className="bg-bg text-text px-1 rounded-md">Admin</span>
      )}
      <LogOut className="ml-2" />
    </span>
  ) : (
    <div className="flex items-center gap-2">
      <Link href="/api/auth/login" className="p-2 border-2 border-bg rounded-md">
        Login
      </Link>
      <Link
        href="/register"
        className="p-2 border-2 border-bg rounded-md bg-bg text-primary"
      >
        SignUp
      </Link>
    </div>
  );
};

const NavBar = () => {
  return (
    <nav className="bg-primary h-12 flex items-center px-2 text-bg text-sm gap-4">
      <span className="mx-4 font-bold">CBC Hotels</span>
      <div className="flex-grow flex items-center h-full justify-end">
        <Link
          className="flex items-center mx-4 gap-2 hover:bg-secondary py-2 px-3 rounded-md transition-colors"
          href={"/"}
        >
          <Bed />
          <span>Find Hotels</span>
        </Link>
        <LoginToolBar userName="enderpalm" loggedIn isAdmin />
      </div>
    </nav>
  );
};

export default NavBar;
