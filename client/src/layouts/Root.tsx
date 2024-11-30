import Navbar from "@/components/route/Navbar";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "@/hooks/reduxHook";
import { RootState } from "@/stores/store";

const Root = () => {
  const { isAuthenticated } = useAppSelector((state: RootState) => state.auth);
  return (
    <div className="w-full flex flex-col items-center relative">
      {isAuthenticated && <Navbar />}
      <h1 className="mt-4">Root Layout</h1>
      <Outlet />
    </div>
  );
};

export default Root;
