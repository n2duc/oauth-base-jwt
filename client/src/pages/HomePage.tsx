import { useAppSelector } from "@/hooks/reduxHook";

const HomePage = () => {
  const { userInfo } = useAppSelector((state) => state.auth);
  return (
    <div>
      <h2>HomePage</h2>
      <p>Welcome, {userInfo?.username}</p>
    </div>
  )
}

export default HomePage