import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function AdminDashboard() {
  const { user } = useContext(AuthContext);

  if (!user?.is_admin) {
    return <h2 className="text-red-500">Access Denied</h2>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <p>Here you can manage products, users, and orders.</p>
    </div>
  );
}
