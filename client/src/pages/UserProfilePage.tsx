import SelectPhoto from "@/components/SelectPhoto";
import UploadAvatar from "@/components/UploadAvatar";
import { useAppSelector } from "@/hooks/reduxHook";
import { useGetProfileQuery } from "@/services/rootApi";

const UserProfilePage = () => {
  const { data, isLoading, error, isSuccess } = useGetProfileQuery();
  const { isShow } = useAppSelector((state) => state.dialog);
  const { userInfo } = useAppSelector((state) => state.auth);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    if ('status' in error) {
      const errMsg = 'error' in error ? error.error : JSON.stringify(error.data);
      return <p>{`An error occurred: ${error.status} ${errMsg}`}</p>;
    }
    return <div>{error.message}</div>
  }

  return (
    <div>
      <h2>UserProfilePage</h2>
      <UploadAvatar avatar={userInfo?.avatar || ''} />
      {isSuccess && <pre>{JSON.stringify(data, null, 2)}</pre>}
      {isShow && <SelectPhoto />}
    </div>
  )
}

export default UserProfilePage