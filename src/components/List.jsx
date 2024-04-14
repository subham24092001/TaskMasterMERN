import React from "react";
import { BiEditAlt } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";
import axios from "axios";
import baseURI from "../utils/constant.jsx";
import { useNavigate } from "react-router-dom";

const List = ({
  id,
  task,
  status,
  setUpdateUI,
  updateMode,
  createdAt,
  updatedAt,
  updateId,
}) => {
  const navigate = useNavigate();

  const userCheck = localStorage.getItem("userId");
  const removetask = () => {
    if (updateId) {
      alert("First Update the Current Task..");
    } else {
      if (userCheck === null) {
        alert("First login then only you can delete task..");
        navigate("/login");
      } else {
        axios.delete(`${baseURI}/delete/${id}`).then((res) => {
          console.log(res);
          setUpdateUI((prev) => !prev);
        });
      }
    }
  };

  const dateCreatedAt = new Date(createdAt);
  const dateUpdatedAt = new Date(updatedAt);

  return (
    <li className="border border-gray-300 rounded-md p-4 mb-4 flex flex-col sm:flex-row items-center justify-between bg-gradient-to-r from-white via-slate-200 to-slate-500">
      <div className="flex-1 mr-4 gap-2">
        <h1 className="text-lg font-bold bg-gradient-to-b from-blue-600 via-indigo-500 to-green-300 text-transparent bg-clip-text">
          {task}
        </h1>
        <hr className="mb-2 border-indigo-400"/>
        <div className="mt-2 sm:mt-0 flex flex-row">
        <BiEditAlt
          className="text-blue-300 cursor-pointer mr-4 hover:text-blue-400"
          onClick={() => updateMode(id, task, status)}
        />
        <br />
        <BsTrash
          className="text-red-300 cursor-pointer hover:text-red-500"
          onClick={removetask}
        />
      </div>
        <hr className="my-2 border-green-400" />
        <div className="text-sm">
          <div className="bg-gradient-to-b from-red-500 via-slate-500 to-yellow-400 text-transparent bg-clip-text">
            Created At:   <span className="bg-gradient-to-b from-white via-slate-500 to-indigo-400 text-transparent bg-clip-text">  {dateCreatedAt.toLocaleString()}</span>
          </div>
          <div className="bg-gradient-to-b from-red-500 via-slate-500 to-yellow-400 text-transparent bg-clip-text">
            Updated At: <span className="bg-gradient-to-b from-white via-slate-500 to-indigo-400 text-transparent bg-clip-text"> {dateUpdatedAt.toLocaleString()}</span>
          </div>
          <hr className="my-2 border-green-400" />
          <div
            className={` ${
              status !== "pending"
                ? "text-red-500"
                : "bg-gradient-to-b from-red-500 via-slate-500 to-yellow-400 text-transparent bg-clip-text"
            }`}
          >
            Status : {status.toUpperCase()}
          </div>
        </div>
      </div>

    </li>
  );
};

export default List;
