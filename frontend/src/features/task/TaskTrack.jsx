import React, { useEffect, useState } from "react";
import moment from "moment";
import taskService from "./taskService";
import { useParams, useNavigate } from "react-router-dom";
import { toTitleCase } from "@/utils/helper";

const TaskTrack = () => {
  const { id } = useParams();
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchTracks = async () => {
    try {
      const data = await taskService.getTrack(id);
      setTracks(data.data);
    } catch (err) {
      console.error("Failed to load task track", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTracks();
  }, []);

  if (loading)
    return <div className="centered-loader">Loading task track...</div>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">Task Track</h4>
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
          ← Back
        </button>
      </div>
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-light">
            <tr>
              <th>S.No</th>
              <th>Task</th>
              <th>Status</th>
              <th>Remarks</th>
              <th>Updated By</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {tracks.length > 0 ? (
              tracks.map((task, index) => (
                <tr key={task._id}>
                  <td>{index + 1}</td>
                  <td>{task.task?.name}</td>
                  <td>
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
                      {toTitleCase(task?.status)}
                    </span>
                  </td>
                  <td>{task.remarks || "---"}</td>
                  <td>{task.updatedBy?.name || "N/A"}</td>
                  <td>
                    {moment(task.createdAt).format("MMM D, YYYY hh:mm A")}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No track found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskTrack;
