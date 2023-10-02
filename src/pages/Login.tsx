import { useFormik } from "formik";
import "../Login.css";
import { loginSchema } from "@/schemas";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { useEffect } from "react";
import useAuth from "@/redux/hooks/useAuth";

interface ILoginProps {
  isActive: boolean;
}

const Login: React.FC<ILoginProps> = ({ isActive }) => {
  const isLoggedIn = useAuth();
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  // console.log({ res });
  const initialValues = {
    email: "",
    password: "",
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues,
    validationSchema: loginSchema,
    validateOnChange: true,
    validateOnBlur: false,

    onSubmit: (values, action) => {
      const { email, password } = values;
      login({ email, password });

      action.resetForm();
    },
  });

  return (
    <div className={`form-wrapper ${isActive ? "is-active" : ""}`}>
      <button type="button" className="switcher switcher-login">
        <Link to={"/login"}>Login</Link>
        <span className="underline"></span>
      </button>
      <form onSubmit={handleSubmit} className="form form-login">
        <>
          <div className="input-block">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              autoComplete="off"
              name="email"
              id="email"
              placeholder="Email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.email && touched.email ? <p className="form-error">{errors.email}</p> : null}
          </div>
          <div className="input-block">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              autoComplete="off"
              name="password"
              id="password"
              placeholder="Password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.password && touched.password ? <p className="form-error">{errors.password}</p> : null}
          </div>
        </>
        <button type="submit" disabled={isLoading} className="btn-login">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
