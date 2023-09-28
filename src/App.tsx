import MainLayout from "./layouts/MainLayout";
import useAuthCheck from "./redux/hooks/useAuthCheck";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  const authCheck = useAuthCheck();

  return !authCheck ? (
    <div>Checking Authentication...</div>
  ) : (
    <>
      <MainLayout />
      <ToastContainer />
    </>
  );
}

export default App;
