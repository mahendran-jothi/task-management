import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().required("Email is required").email("Invalid email"),
  mobileNumber: yup
    .string()
    .required("Mobile number is required")
    .matches(/^[0-9]{10,15}$/, "Invalid mobile number"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  country: yup.string().required("Country is required"),
  state: yup.string().required("State is required"),
  city: yup.string().required("City is required"),
  gender: yup.string().oneOf(["male", "female", "other"], "Select a gender"),
});

const RegisterForm = () => {
  const { signup } = useAuth();
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
      await signup(data);
      toast.success("Registration successful!");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <h2 className="mb-4 text-center">Register</h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="border p-4 rounded shadow-sm"
          >
            {[
              { label: "Name", name: "name", type: "text" },
              { label: "Email", name: "email", type: "email" },
              { label: "Mobile Number", name: "mobileNumber", type: "text" },
              { label: "Password", name: "password", type: "password" },
              { label: "Country", name: "country", type: "text" },
              { label: "State", name: "state", type: "text" },
              { label: "City", name: "city", type: "text" },
            ].map((field) => (
              <div className="mb-3" key={field.name}>
                <label htmlFor={field.name} className="form-label">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  className={`form-control ${
                    errors[field.name] ? "is-invalid" : ""
                  }`}
                  id={field.name}
                  {...register(field.name)}
                />
                {errors[field.name] && (
                  <div className="invalid-feedback">
                    {errors[field.name].message}
                  </div>
                )}
              </div>
            ))}

            <div className="mb-3">
              <label className="form-label">Gender</label>
              <select
                className={`form-select ${errors.gender ? "is-invalid" : ""}`}
                {...register("gender")}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && (
                <div className="invalid-feedback">{errors.gender.message}</div>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-success w-100"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>

            <div className="text-center mt-3">
              <span>Already have an account? </span>
              <a href="/" className="text-primary fw-semibold">
                Login
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
