import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import taskService from "./taskService";
import moment from "moment";

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name cannot exceed 50 characters"),
  description: yup
    .string()
    .required("Description is required")
    .max(2000, "Description cannot exceed 2000 characters"),
  startDate: yup
    .date()
    .required("Start Date is required")
    .typeError("Start Date must be a valid date"),
  endDate: yup
    .date()
    .required("End Date is required")
    .typeError("End Date must be a valid date")
    .min(yup.ref("startDate"), "End Date cannot be before Start Date"),
  totalTask: yup
    .number()
    .typeError("Total Task must be a number")
    .required("Total Task is required")
    .min(1, "Total Task must be at least 1"),
});

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const fetchTask = async () => {
    try {
      const data = await taskService.getById(id);
      setValue("name", data.data.name);
      setValue("description", data.data.description);
      setValue("startDate", moment(data.data.startDate).format("YYYY-MM-DD"));
      setValue("endDate", moment(data.data.endDate).format("YYYY-MM-DD"));
      setValue("totalTask", data.data.totalTask);
    } catch (err) {
      toast.error("Failed to fetch task.");
      navigate("/dashboard");
    }
  };

  useEffect(() => {
    fetchTask();
  }, [id]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await taskService.update(id, data);
      toast.success(res.message || "Task updated successfully");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.message || "Failed to update task.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-sm border">
            <div className="card-body">
              <h4 className="mb-4">Edit Task</h4>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                  <label className="form-label">
                    Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.name ? "is-invalid" : ""
                    }`}
                    id="name"
                    {...register("name")}
                  />
                  {errors.name && (
                    <div className="invalid-feedback">
                      {errors.name.message}
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">
                    Description <span className="text-danger">*</span>
                  </label>
                  <textarea
                    className={`form-control ${
                      errors.description ? "is-invalid" : ""
                    }`}
                    id="description"
                    {...register("description")}
                    rows="4"
                  ></textarea>
                  {errors.description && (
                    <div className="invalid-feedback">
                      {errors.description.message}
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">
                    Start Date <span className="text-danger">*</span>
                  </label>
                  <input
                    type="date"
                    className={`form-control ${
                      errors.startDate ? "is-invalid" : ""
                    }`}
                    {...register("startDate")}
                  />
                  {errors.startDate && (
                    <div className="invalid-feedback">
                      {errors.startDate.message}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    End Date <span className="text-danger">*</span>
                  </label>
                  <input
                    type="date"
                    className={`form-control ${
                      errors.endDate ? "is-invalid" : ""
                    }`}
                    {...register("endDate")}
                  />
                  {errors.endDate && (
                    <div className="invalid-feedback">
                      {errors.endDate.message}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Total Task <span className="text-danger">*</span>
                  </label>
                  <input
                    type="number"
                    className={`form-control ${
                      errors.totalTask ? "is-invalid" : ""
                    }`}
                    {...register("totalTask")}
                    min="1"
                  />
                  {errors.totalTask && (
                    <div className="invalid-feedback">
                      {errors.totalTask.message}
                    </div>
                  )}
                </div>
                <div className="d-flex justify-content-between gap-2">
                  <button
                    type="button"
                    className="btn btn-secondary w-50"
                    onClick={() => navigate("/dashboard")}
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary w-50"
                    disabled={loading}
                  >
                    {loading ? "Updating..." : "Update Task"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTask;
