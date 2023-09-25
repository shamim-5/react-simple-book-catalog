import { useFormik } from "formik";
import "../Login.css";
import { signupSchema } from "@/schemas";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { useAppSelector } from "@/redux/hooks/hook";
import { useEffect } from "react";

interface ISignupProps {
  isActive: boolean;
}
const Signup: React.FC<ISignupProps> = ({ isActive }) => {
  const auth = useAppSelector((state) => state?.auth);
  const [register, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();
  // console.log({ res });

  useEffect(() => {
    if (auth?.accessToken && auth?.user) {
      navigate("/");
    }
  }, [auth?.accessToken, auth?.user, navigate]);

  const initialValues = {
    email: "",
    password: "",
    confirm_password: "",
  };
  const { values, handleBlur, handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues,
    validationSchema: signupSchema,
    validateOnChange: true,
    validateOnBlur: false,
    onSubmit: (values, action) => {
      const { email, password } = values;
      register({ email, password });

      action.resetForm();
    },
  });

  return (
    <div className={`form-wrapper ${isActive ? "is-active" : ""}`}>
      <button type="button" className="switcher switcher-signup">
        <Link to={"/signup"}> Sign Up</Link>
        <span className="underline"></span>
      </button>
      <form onSubmit={handleSubmit} className="form form-signup">
        <>
          <div className="input-block">
            <label htmlFor="signup-email">E-mail</label>
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
            <label htmlFor="signup-password">Password</label>
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
          <div className="input-block">
            <label htmlFor="signup-password-confirm">Confirm password</label>
            <input
              type="password"
              autoComplete="off"
              name="confirm_password"
              id="confirm_password"
              placeholder="Confirm Password"
              value={values.confirm_password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.confirm_password && touched.confirm_password ? (
              <p className="form-error">{errors.confirm_password}</p>
            ) : null}
          </div>
        </>
        <button type="submit" disabled={isLoading} className="btn-signup">
          Continue
        </button>
      </form>
    </div>
  );
};

export default Signup;
