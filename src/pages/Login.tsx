import { useFormik } from "formik";
import "../Login.css";
import { loginSchema } from "@/schemas";
import { Link } from "react-router-dom";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

interface ILoginProps {
  isActive: boolean;
}

const Login: React.FC<ILoginProps> = ({ isActive }) => {
  const initialValues = {
    email: "",
    password: "",
  };

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues,
    validationSchema: loginSchema,
    validateOnChange: true,
    validateOnBlur: false,
    //// By disabling validation onChange and onBlur formik will validate on submit.
    onSubmit: (values, action) => {
      // firebase authentication for login
      const { email, password } = values;
      signInWithEmailAndPassword(auth, email, password)
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
        <button type="submit" className="btn-login">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
