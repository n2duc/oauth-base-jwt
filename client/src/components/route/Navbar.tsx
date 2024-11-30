import { NavLink } from "react-router-dom";
import PreviousButton from "./PreviousButton";
import LogoutButton from "./LogoutButton";
import { useAppSelector } from "@/hooks/reduxHook";
import { RootState } from "@/stores/store";

interface INavbarLink {
  href: string;
  title: string;
}

const navbarLink: INavbarLink[] = [
  {
    href: "/",
    title: "Home"
  },
  {
    href: "/dashboard",
    title: "Dashboard"
  },
  {
    href: "/card",
    title: "Card"
  },
  {
    href: "/profile",
    title: "Profile"
  }
]

const Navbar = () => {
  const { userInfo } = useAppSelector((state: RootState) => state.auth);
  return (
    <div className="w-full sticky top-0 left-0 right-0 bg-zinc-700 py-2">
      <div className="mx-auto max-w-5xl flex justify-between">
        <PreviousButton />
        <nav className="flex items-center gap-4">
          {navbarLink?.map((link) => (
            <NavLink 
              key={link.title} 
              to={link.href}
              className={({ isActive }) => isActive ? "text-sky-300 bg-zinc-700 border border-zinc-600" : "text-sky-400"}
            >
              {link.title}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-5">
          <p className="text-sky-400">Welcome, {userInfo?.username}</p>
          <LogoutButton />
        </div>
      </div>
    </div>
  )
};

export default Navbar;