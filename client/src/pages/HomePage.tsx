import { useAppSelector } from "@/hooks/reduxHook";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { userInfo } = useAppSelector((state) => state.auth);
  return (
    <div>
      <h2>HomePage</h2>
      <p>Welcome, {userInfo?.username}</p>
      <Link to="/profile">
        <button>Profile</button>
      </Link>
    </div>
  )
}

export default HomePage