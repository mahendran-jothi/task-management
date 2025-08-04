import { Link } from "react-router-dom";
import { PenLine, Edit, Delete } from "lucide-react";
import moment from "moment";
import { toTitleCase } from "@/utils/helper";

const TaskList = ({
  task,
  page,
  limit,
  setSelectedTaskId,
  setStatusValue,
  setStatusRemarks,
  setShowStatusModal,
  setShowDeleteModal,
}) => {
  if (!task.length) {
    return (
      <tr>
        <td colSpan="11" className="text-center">
          No tasks found.
        </td>
      </tr>
    );
  }

  return task.map((task, index) => (
    <tr key={task._id}>
      <td>{(page - 1) * limit + index + 1}</td>
      <td>{task.name}</td>
      <td>{task.description}</td>
      <td>{moment(task.startDate).format("MMM D, YYYY")}</td>
      <td>{moment(task.endDate).format("MMM D, YYYY")}</td>
      <td>{task.totalTask}</td>
      <td>{task?.createdBy?.name || "N/A"}</td>
      <td>{task?.updatedBy?.name || "N/A"}</td>
      <td>{moment(task.createdAt).format("MMM D, YYYY hh:mm A")}</td>
      <td>
        <div className="d-flex align-items-center gap-2">
          <Link to={`/task/${task._id}/track`}>
            <span
              className={`badge ${
                task.status === "completed"
                  ? "bg-success"
                  : task.status === "in_progress"
                  ? "bg-primary"
                  : task.status === "pending"
                  ? "bg-warning text-dark"
                  : "bg-danger"
              }`}
            >
              {toTitleCase(task.status)}
            </span>
          </Link>
          <button
            className="btn btn-sm btn-info"
            onClick={() => {
              setSelectedTaskId(task._id);
              setStatusValue(task.status);
              setStatusRemarks("");
              setShowStatusModal(true);
            }}
          >
            <PenLine size={10} />
          </button>
        </div>
      </td>
      <td>
        <div className="d-flex">
          <Link
            to={`/task/edit/${task._id}`}
            className="btn btn-sm btn-warning me-2"
          >
            <Edit size={16} />
          </Link>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => {
              setSelectedTaskId(task._id);
              setShowDeleteModal(true);
            }}
          >
            <Delete size={16} />
          </button>
        </div>
      </td>
    </tr>
  ));
};

export default TaskList;
