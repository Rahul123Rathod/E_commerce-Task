import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Home() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-[400px] text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Welcome, {user?.username} 👋
        </h1>
        <p className="text-gray-600">Email: {user?.email}</p>
        <p className="text-gray-600 mb-4">
          Role:{" "}
          <span className="font-semibold">
            {user?.is_admin ? "Admin" : "Customer"}
          </span>
        </p>

        <div className="flex flex-col gap-3">
          <Link
            to="/cart"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg shadow"
          >
            🛒 Go to Cart
          </Link>

          {user?.is_admin && (
            <Link
              to="/admin"
              className="bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-lg shadow"
            >
              ⚡ Admin Dashboard
            </Link>
          )}

          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg shadow"
          >
            🚪 Logout
          </button>
        </div>
      </div>
    </div>
  );
}
