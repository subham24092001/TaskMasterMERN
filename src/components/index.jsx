import { useEffect, useState } from "react";
import axios from "axios";
import baseURI from "../utils/constant.jsx";
import List from "./List.jsx";
import { useNavigate } from "react-router-dom";

function Main() {
  const navigate = useNavigate();

  const [input, setInput] = useState("");
  const [statuss, setStatuss] = useState("");
  const [tasks, setTasks] = useState([]);
  const [updateUI, setUpdateUI] = useState(false);
  const [updateId, setUpdateId] = useState(null);
  const [buttonLoading, setButtonLoading] = useState(false);

  useEffect(() => {
    axios.get(`${baseURI}/get`).then((res) => {
      console.log(res.data);
      setTasks(res.data);
    });
  }, [updateUI]);

  const addTask = () => {
    if (input.trim() === "") {
      alert("Please enter a task");
    } else if (statuss.trim() === "") {
      alert("Write a Status for the Task [pending , completed]");
    } else if (
      statuss.trim().toLowerCase() !== "pending" &&
      statuss.trim().toLowerCase() !== "completed"
    ) {
      alert("Either write pending or completed..");
    } else {
      const userCheck = localStorage.getItem("userId");
      if (userCheck === null) {
        alert("First login then only you can add task..");
        navigate("/login");
      } else {
        setButtonLoading(true);
        axios
          .post(`${baseURI}/save`, {
            task: input,
            status: statuss.toLowerCase(),
          })
          .then((res) => {
            console.log(res.data);
            setInput("");
            setStatuss("");
            setUpdateUI((prevstat) => !prevstat);
            setButtonLoading(false);
          });
      }
    }
  };

  const updateMode = (id, text, status) => {
    console.log(text);
    setInput(text);
    setStatuss(status);
    setUpdateId(id);
  };

  const updateTask = () => {
    if (input.trim() === "") {
      alert("Please enter a task");
    } else if (statuss.trim() === "") {
      alert("Write a Status for the Task [pending , completed]");
    } else if (
      statuss.trim().toLowerCase() !== "pending" &&
      statuss.trim().toLowerCase() !== "completed"
    ) {
      alert("Either write pending or completed..");
    } else {
      const userCheck = localStorage.getItem("userId");
      if (userCheck === null) {
        alert("First login then only you can update task..");
        navigate("/login");
      } else {
        setButtonLoading(true);
        axios
          .put(`${baseURI}/update/${updateId}`, {
            task: input,
            status: statuss.toLowerCase(),
          })
          .then((res) => {
            console.log(res.data);
            setUpdateUI((prev) => !prev);
            setUpdateId(null);
            setInput("");
            setStatuss("");
            setButtonLoading(false);
          });
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-center items-center mt-7 mb-2 bg-white rounded-lg">
      <h1 className="bg-gradient-to-b from-slate-400 via-slate-500 to-slate-300 text-transparent bg-clip-text">Task Master</h1>
      </div>
      <hr/>
      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-4 mt-5">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full sm:w-auto border border-gray-300 rounded-md px-4 py-1"
            placeholder="Enter your task"
          />
          <input
            type="text"
            value={statuss}
            onChange={(e) => setStatuss(e.target.value)}
            className="w-full sm:w-auto border border-gray-300 rounded-md px-4 py-1"
            placeholder="Status"
          />
          <button
            onClick={updateId ? updateTask : addTask}
            className={`bg-blue-500 text-white px-6 py-1 rounded-md hover:bg-blue-600 transition-all duration-300 ${
              buttonLoading ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            {updateId ? "Update Task" : "Add Task"}
          </button>
      </div>
      <ul className="space-y-4">
        {tasks.map((task) => {
          return (
            <List
              key={task._id}
              id={task._id}
              task={task.task}
              status={task.status}
              setUpdateUI={setUpdateUI}
              updateMode={updateMode}
              createdAt={task.createdAt}
              updatedAt={task.updatedAt}
              updateId={updateId}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default Main;
