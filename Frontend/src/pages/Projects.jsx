import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Projects() {

  const [projects, setProjects] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    const res = await api.get("/projects");
    setProjects(res.data);
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">

      <Sidebar />

      <div className="flex-1 p-6">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Projects</h1>

          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
            + New Project
          </button>
        </div>

        {/* PROJECT CARDS */}
        <div className="grid grid-cols-3 gap-6">

          {projects.map(p => (
            <div
              key={p.id}
              onClick={() => navigate(`/projects/${p.id}`)}
              className="bg-white p-6 rounded-xl shadow cursor-pointer hover:shadow-md"
            >

              <h2 className="text-lg font-semibold">{p.name}</h2>
              <p className="text-gray-500 text-sm mt-1">
                Testing Csv file and model testing
              </p>

              <div className="mt-4 flex justify-between text-sm text-gray-500">
                <span>1 members</span>
                <span className="text-blue-600">View details →</span>
              </div>

            </div>
          ))}

        </div>

      </div>
    </div>
  );
}