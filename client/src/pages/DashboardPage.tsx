import Table from "@/components/ui/table";
import { useGetAllUsersQuery } from "@/services/rootApi";

const DashboardPage = () => {
  const { data, isSuccess, isLoading } = useGetAllUsersQuery();
  if (isLoading) return <p>Loading data...</p>
  return (
    <div>
      <Table data={isSuccess ? data.data : []} />
    </div>
  );
};

export default DashboardPage;
