import { useFormik } from "formik";
import "../Login.css";
import { signupSchema } from "@/schemas";
import { Link } from "react-router-dom";
import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

interface ISignupProps {
  isActive: boolean;
}
const Signup: React.FC<ISignupProps> = ({ isActive }) => {
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
    //// By disabling validation onChange and onBlur formik will validate on submit.
    onSubmit: (values, action) => {
      // firebase authentication for signup
      const { email, password } = values;
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          console.log(error);
        });

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
        <button type="submit" className="btn-signup">
          Continue
        </button>
      </form>
    </div>
  );
};

export default Signup;
