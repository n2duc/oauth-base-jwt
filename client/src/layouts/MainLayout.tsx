import { Outlet } from "react-router-dom";
import Navbar from "@/components/route/Navbar";
import { useAppSelector } from "@/hooks/reduxHook";
import { RootState } from "@/stores/store";

const MainLayout = () => {
  const { isAuthenticated } = useAppSelector((state: RootState) => state.auth);
  return (
    <>
      {isAuthenticated && <Navbar />}
      <div className="w-full mx-auto max-w-5xl pt-5">
        <h1>Main Layout</h1>
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;
