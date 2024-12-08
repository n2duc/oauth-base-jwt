import { User } from "@/type/data-models";
import { Link } from "react-router-dom";

const Table = ({ data }: { data: User[] }) => {
  console.log(Object.keys(data[data.length - 1]).slice(0, 5));
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-zinc-700 uppercase bg-gray-50 dark:bg-zinc-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              ID
            </th>
            <th scope="col" className="px-6 py-3">
              Username
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Role
            </th>
            <th scope="col" className="px-6 py-3">
              Avatar
            </th>
          </tr>
        </thead>
        <tbody>
          {data && data.map((user) => (
            <tr className="bg-white border-b dark:bg-zinc-800 dark:border-zinc-700" key={user._id}>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-zinc-900 whitespace-nowrap dark:text-white"
              >
                {user._id}
              </th>
              <td className="px-6 py-4">{user.username}</td>
              <td className="px-6 py-4">{user.email}</td>
              <td className={`${user.role === "USER" ? "text-blue-300" : "text-red-400"} px-6 py-4`}>{user.role}</td>
              <td className="px-6 py-4">
                <Link target="_blank" to={user.avatar}>Link</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
