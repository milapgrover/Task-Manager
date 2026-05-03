import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import api from "../services/api";

import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";

export default function Dashboard() {

  const [stats, setStats] = useState({
    projects: 0,
    tasks: 0,
    todo: 0,
    inProgress: 0,
    completed: 0
  });

  const [trendData, setTrendData] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const projectRes = await api.get("/projects");
      const taskRes = await api.get("/tasks");

      const projects = projectRes.data;
      const tasks = taskRes.data;

      // 🔥 CALCULATE STATS
      const todo = tasks.filter(t => t.status === "TODO").length;
      const inProgress = tasks.filter(t => t.status === "IN_PROGRESS").length;
      const completed = tasks.filter(t => t.status === "DONE").length;

      setStats({
        projects: projects.length,
        tasks: tasks.length,
        todo,
        inProgress,
        completed
      });

      // 🔥 TREND (GROUP BY DAY)
      const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

      const grouped = days.map(day => ({
        day,
        value: tasks.filter(t => {
          const d = new Date(t.createdAt);
          return days[d.getDay()] === day;
        }).length
      }));

      setTrendData(grouped);

    } catch (err) {
      console.log(err);
    }
  };

  const pieData = [
    { name: "Completed", value: stats.completed },
    { name: "Pending", value: stats.todo + stats.inProgress }
  ];

  const COLORS = ["#22c55e", "#ef4444"];

  return (
    <div className="flex bg-gray-100 min-h-screen">

      <Sidebar />

      <div className="flex-1 p-6">

        <Header title="Dashboard" />

        {/* 🔥 CARDS */}
        <div className="grid grid-cols-4 gap-6 mb-6">

          <Card title="Total Projects" value={stats.projects} sub="Active projects" />
          <Card title="Total Tasks" value={stats.tasks} sub={`${stats.completed} completed`} />
          <Card title="To Do" value={stats.todo} sub="Tasks waiting" />
          <Card title="In Progress" value={stats.inProgress} sub="Currently running" />

        </div>

        {/* 🔥 CHARTS */}
        <div className="grid grid-cols-3 gap-6">

          {/* 📈 LINE */}
          <div className="bg-white p-6 rounded-xl shadow col-span-2">

            <h3 className="font-semibold mb-1">Task Trends</h3>
            <p className="text-gray-400 text-sm mb-4">Daily activity</p>

            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={trendData}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#3b82f6"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>

          </div>

          {/* 🥧 PIE */}
          <div className="bg-white p-6 rounded-xl shadow flex flex-col items-center justify-center">

            <h3 className="font-semibold mb-1">Project Status</h3>
            <p className="text-gray-400 text-sm mb-4">Completion ratio</p>

            <PieChart width={200} height={200}>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
            </PieChart>

          </div>

        </div>

      </div>
    </div>
  );
}

function Card({ title, value, sub }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <p className="text-gray-500">{title}</p>
      <h2 className="text-3xl font-bold mt-2">{value}</h2>
      <p className="text-sm text-gray-400 mt-1">{sub}</p>
    </div>
  );
}