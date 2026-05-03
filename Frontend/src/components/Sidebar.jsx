import { useNavigate } from "react-router-dom";
import { removeToken } from "../utils/token";

export default function Sidebar() {
  const navigate = useNavigate();

  const logout = () => {
    removeToken();
    navigate("/");
  };

  return (
    <div className="w-64 bg-white shadow flex flex-col justify-between">

      <div>
        {/* Logo */}
        <div className="p-6 border-b">
          <h1 className="text-xl font-bold text-blue-600">TaskMgr</h1>
          <p className="text-sm text-gray-500">Hello, Admin</p>
          <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full">
            Admin
          </span>
        </div>

        {/* Menu */}
        <ul className="p-4 space-y-4 text-gray-600">
          <li onClick={() => navigate("/dashboard")} className="cursor-pointer hover:text-blue-600">
            Dashboard
          </li>
          <li onClick={() => navigate("/projects")} className="cursor-pointer hover:text-blue-600">
            Projects
          </li>
          <li onClick={() => navigate("/tasks")} className="cursor-pointer hover:text-blue-600">
            All Tasks
          </li>
        </ul>
      </div>

      {/* Logout */}
      <div className="p-4 border-t">
        <button
          onClick={logout}
          className="text-red-500 font-medium"
        >
          Logout
        </button>
      </div>

    </div>
  );
}