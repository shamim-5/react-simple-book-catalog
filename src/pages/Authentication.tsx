import { useState, useEffect } from "react";
import "../Login.css";
import Signup from "./Signup";
import Login from "./Login";
import { useLocation } from "react-router-dom";

const Authentication = () => {
  const location = useLocation();
  const [path, setPath] = useState(location.pathname.replace(/^.*[/]/, ""));

  const isActive = true;

  useEffect(() => {
    const switchers = [...document.querySelectorAll(".switcher")];

    switchers.forEach((item) => {
      item.addEventListener("click", () => {
        switchers.forEach((switcher) => switcher.parentElement?.classList.remove("is-active"));
        (item.parentElement as HTMLElement).classList.add("is-active");
      });
    });

    setPath(location.pathname.replace(/^.*[/]/, ""));
  }, [location.pathname]);

  console.log(path);
  console.log(isActive);

  return (
    <div className="bg-[#253858]">
      <section className="forms-section">
        <h1 className="section-title">Authentication Forms</h1>
        <div className="forms">
          {path === "login" ? (
            <>
              <Login isActive={isActive} />
              <Signup isActive={!isActive} />
            </>
          ) : (
            <>
              <Login isActive={!isActive} />
              <Signup isActive={isActive} />
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Authentication;
