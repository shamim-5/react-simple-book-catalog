import MainLayout from "./layouts/MainLayout";
import useAuthCheck from "./redux/hooks/useAuthCheck";

function App() {
  const authCheck = useAuthCheck();

  return !authCheck ? (
    <div>Checking Authentication...</div>
  ) : (
    <>
      <MainLayout />
    </>
  );
}

export default App;
