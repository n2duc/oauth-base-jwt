import { useGetProfileQuery } from "@/services/rootApi";

const UserProfilePage = () => {
  const { data, isLoading, error, isSuccess } = useGetProfileQuery({});

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
      {isSuccess && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  )
}

export default UserProfilePage