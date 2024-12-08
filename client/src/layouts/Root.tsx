import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <div className="w-full flex flex-col items-center relative">
      <Outlet />
    </div>
  );
};

export default Root;
