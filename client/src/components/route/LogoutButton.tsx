import { useAppDispatch } from "@/hooks/reduxHook";
import { logout } from "@/stores/auth/auth.action";

const LogoutButton = () => {
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <button onClick={handleLogout}>Logout</button>
  )
};

export default LogoutButton;