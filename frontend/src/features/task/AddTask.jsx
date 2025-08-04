import React, { useState } from "react";
import taskService from "./taskService";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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
const AddTask = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await taskService.create(data);
      toast.success(res.message || "Task created successfully");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.message);
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
              <h4 className="mb-4">Add New Task</h4>
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
                    {loading ? "Loading..." : "Add Project"}
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

export default AddTask;
