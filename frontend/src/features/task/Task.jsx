import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import taskService from "@/features/task/taskService";
import TaskList from "@/features/task/TaskList";
import TaskStatusModal from "@/features/task/TaskStatusModal";
import DeleteConfirmModal from "@/features/task/DeleteConfirmModal";
import Pagination from "@/components/Pagination";

const Task = () => {
  const [task, setTask] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [statusRemarks, setStatusRemarks] = useState("");
  const [statusValue, setStatusValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const fetchTask = async (query = "", currentPage = 1) => {
    try {
      setLoading(true);
      const data = await taskService.getAll(query, currentPage);
      setTask(data.data?.tasks || []);
      setTotalPages(data.data?.pagination?.pages || 1);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTask(searchQuery, page);
  }, [page]);

  useEffect(() => {
    if (searchQuery.trim().length >= 2 || searchQuery.trim().length === 0) {
      const delayDebounce = setTimeout(() => {
        setPage(1);
        fetchTask(searchQuery, 1);
      }, 500);
      return () => clearTimeout(delayDebounce);
    }
  }, [searchQuery]);

  const handleDelete = async () => {
    try {
      setLoading(true);
      const data = await taskService.remove(selectedTaskId);
      toast.success(data.message || "Task deleted successfully");
      setShowDeleteModal(false);
      fetchTask(searchQuery, page);
    } catch (err) {
      toast.error(err.message || "Delete failed");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async () => {
    if (!statusValue) {
      toast.error("Please select a status");
      return;
    }
    try {
      setLoading(true);
      const payload = {
        status: statusValue,
        remarks: statusRemarks,
      };
      const data = await taskService.updateStatus(selectedTaskId, payload);
      toast.success(data.message || "Status updated successfully");
      setShowStatusModal(false);
      fetchTask(searchQuery, page);
    } catch (error) {
      toast.error(error.message || "Failed to update status");
    } finally {
      setLoading(false);
    }
  };

  const handlePrevious = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  if (loading) return <div className="centered-loader">Loading tasks...</div>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Task List</h2>
        <Link to="/task/add">
          <button className="btn btn-primary">+ Add Task</button>
        </Link>
      </div>

      <div className="row mb-3">
        <div className="col-md-6 offset-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name or status"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-light">
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Description</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Total Task</th>
              <th>Created By</th>
              <th>Updated By</th>
              <th>Created At</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <TaskList
              task={task}
              page={page}
              limit={limit}
              setSelectedTaskId={setSelectedTaskId}
              setStatusValue={setStatusValue}
              setStatusRemarks={setStatusRemarks}
              setShowStatusModal={setShowStatusModal}
              setShowDeleteModal={setShowDeleteModal}
            />
          </tbody>
        </table>
      </div>

      <Pagination
        page={page}
        totalPages={totalPages}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onPageSelect={setPage}
      />

      {showStatusModal && (
        <TaskStatusModal
          statusValue={statusValue}
          setStatusValue={setStatusValue}
          statusRemarks={statusRemarks}
          setStatusRemarks={setStatusRemarks}
          onClose={() => setShowStatusModal(false)}
          onUpdate={handleStatusUpdate}
        />
      )}

      {showDeleteModal && (
        <DeleteConfirmModal
          onClose={() => setShowDeleteModal(false)}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default Task;
