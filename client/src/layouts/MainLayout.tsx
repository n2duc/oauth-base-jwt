import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="w-full mx-auto max-w-5xl">
      <h1>Main Layout</h1>
      <Outlet />
    </div>
  );
};

export default MainLayout;
