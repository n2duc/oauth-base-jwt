import { useAppDispatch } from "@/hooks/reduxHook";
import { logout } from "@/stores/auth/auth.slice";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div>
      <h1>Main Layout</h1>
      <Outlet />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default MainLayout;
