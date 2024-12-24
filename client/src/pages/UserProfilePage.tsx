import SelectPhoto from "@/components/SelectPhoto";
import Seo from "@/components/Seo";
import UploadAvatar from "@/components/UploadAvatar";
import { useAppSelector } from "@/hooks/reduxHook";
import { useGetProfileQuery } from "@/services/rootApi";
import { RootState } from "@/stores/store";
import { useEffect } from "react";

const UserProfilePage = () => {
  const { data, isLoading, error, isSuccess, refetch } = useGetProfileQuery();
  const { isShow } = useAppSelector((state: RootState) => state.dialog);
  const { userInfo } = useAppSelector((state: RootState) => state.auth);

  useEffect(() => {
    refetch();
  }, [refetch]);
  
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    if ("status" in error) {
      const errMsg =
        "error" in error ? error.error : JSON.stringify(error.data);
      return <p>{`An error occurred: ${error.status} ${errMsg}`}</p>;
    }
    return <div>{error.message}</div>;
  }

  return (
    <>
      <Seo
        title={`Profile - ${userInfo?.username}`}
        description="Description for Profile Page"
      />
      <div className="p-4 bg-zinc-700">
        <h2>UserProfilePage</h2>
        <div className="flex justify-between items-center">
          <UploadAvatar avatar={userInfo?.avatar || ""} />
          {userInfo?.role === "ADMIN" && (
            <h1 className="text-red-500">
              Bố mày là ADMIN
            </h1>
          )}
        </div>
        {isSuccess && <pre>{JSON.stringify(data, null, 2)}</pre>}
        {isShow && <SelectPhoto />}
      </div>
    </>
  );
};

export default UserProfilePage;
