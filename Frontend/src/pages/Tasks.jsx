import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import axios from "axios";

export default function Tasks() {

  const [tasks, setTasks] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const res = await axios.get("http://localhost:8080/tasks", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setTasks(res.data);

    } catch (err) {
      console.log("ERROR:", err);
    }
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <div className="flex-1 p-6">

        <Header title="All Tasks" />

        <div className="space-y-6">

          {tasks.length === 0 ? (
            <p className="text-gray-500">No tasks available</p>
          ) : (
            tasks.map(task => (
              <TaskCard key={task.id} task={task} />
            ))
          )}

        </div>

      </div>
    </div>
  );
}

/* ===================== TASK CARD ===================== */

function TaskCard({ task }) {

  const statusColor = {
    DONE: "bg-green-100 text-green-600",
    IN_PROGRESS: "bg-yellow-100 text-yellow-600",
    TODO: "bg-gray-200 text-gray-600"
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 flex justify-between">

      {/* LEFT SECTION */}
      <div className="flex-1">

        <h2 className="text-lg font-semibold">{task.title}</h2>
        <p className="text-gray-500 text-sm mb-4">test case</p>

        <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600 space-y-1">

          <p>
            <b>Project:</b> {task.project?.name || "N/A"}
          </p>

          <p>
            <b>Assigned To:</b> {task.assignee?.name || "N/A"}
          </p>

          <p>
            <b>Start:</b> {formatDate(task.createdAt)}
          </p>

          <p>
            <b>Due:</b> {formatDate(task.dueDate)}
          </p>

        </div>

      </div>

      {/* RIGHT PANEL */}
      <div className="w-64 ml-6">

        <p className="text-sm text-gray-500 mb-1">STATUS</p>

        <div className={`p-3 rounded-lg text-center font-medium ${statusColor[task.status]}`}>
          {formatStatus(task.status)}
        </div>

        <p className="text-sm text-gray-500 mt-4 mb-1">PROCESS NOTES</p>

        <div className="bg-gray-100 p-3 rounded-lg text-sm text-gray-500 h-24">
          -
        </div>

      </div>

    </div>
  );
}

/* ===================== HELPERS ===================== */

function formatDate(date) {
  if (!date) return "N/A";
  return new Date(date).toLocaleDateString();
}

function formatStatus(status) {
  if (status === "DONE") return "Completed";
  if (status === "IN_PROGRESS") return "In Progress";
  return "To Do";
}