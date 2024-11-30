import { Navigate, Outlet, useLocation } from "react-router-dom"
import { ROLE } from "@/type/roles"
import { RootState } from "@/stores/store"
import { useAppSelector } from "@/hooks/reduxHook"

type PrivateRouteProps = {
  allowRoles: Array<ROLE>
}

const PrivateRoute = ({ allowRoles }: PrivateRouteProps) => {
  const { userInfo, isAuthenticated } = useAppSelector((state: RootState) => state.auth);

  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/signin" state={{ from: location }} replace />
  }

  if (userInfo && !allowRoles.includes(userInfo.role)) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

export default PrivateRoute;