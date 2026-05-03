import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import axios from "axios";

export default function ProjectDetails() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {

    const headers = {
      Authorization: `Bearer ${token}`
    };

    const projectRes = await axios.get(`http://localhost:8080/projects`, { headers });
    const taskRes = await axios.get(`http://localhost:8080/tasks`, { headers });

    const selectedProject = projectRes.data.find(p => p.id == id);

    setProject(selectedProject);

    // 🔥 Filter tasks of this project
    const filteredTasks = taskRes.data.filter(t => t.project?.id == id);
    setTasks(filteredTasks);
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">

      <Sidebar />

      <div className="flex-1 p-6">

        {/* BACK */}
        <button
          onClick={() => navigate("/projects")}
          className="text-gray-500 mb-4"
        >
          ← Back to Projects
        </button>

        {/* PROJECT HEADER */}
        {project && (
          <div className="bg-white p-6 rounded-xl shadow mb-6">
            <h1 className="text-2xl font-bold">{project.name}</h1>
            <p className="text-gray-500 mt-1">
              Testing Csv file and model testing
            </p>

            <p className="text-sm text-gray-400 mt-3">
              Created by Admin • 1 members
            </p>
          </div>
        )}

        {/* TASK HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Tasks</h2>

          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
            + Add Task
          </button>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-xl shadow overflow-hidden">

          <table className="w-full text-left">

            <thead className="bg-gray-50 text-gray-500 text-sm">
              <tr>
                <th className="p-4">Title</th>
                <th>Assigned</th>
                <th>Start</th>
                <th>Due</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>

              {tasks.map(task => (
                <tr key={task.id} className="border-t">

                  <td className="p-4">
                    <p className="font-medium">{task.title}</p>
                    <p className="text-sm text-gray-500">test case</p>
                  </td>

                  <td>{task.assignee?.name}</td>

                  <td>{formatDate(task.createdAt)}</td>

                  <td>{formatDate(task.dueDate)}</td>

                  <td>
                    <StatusBadge status={task.status} />
                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>
    </div>
  );
}

/* STATUS BADGE */

function StatusBadge({ status }) {

  const styles = {
    DONE: "bg-green-100 text-green-600",
    IN_PROGRESS: "bg-yellow-100 text-yellow-600",
    TODO: "bg-gray-200 text-gray-600"
  };

  const label = {
    DONE: "Completed",
    IN_PROGRESS: "In Progress",
    TODO: "To Do"
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm ${styles[status]}`}>
      {label[status]}
    </span>
  );
}

function formatDate(date) {
  if (!date) return "-";
  return new Date(date).toLocaleDateString();
}