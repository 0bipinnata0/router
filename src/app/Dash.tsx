import { useEffect } from "react";
import Outlet from "../components/Outlet";
// import { Outlet } from "react-router-dom";

const Dash: React.FC<React.PropsWithChildren> = () => {
  useEffect(() => {
    console.info("Dash装载");
    return () => {
      console.info("卸载Dash<<<");
    };
  }, []);
  return (
    <div>
      Dash
      <div>
        {/* {children} */}
        <Outlet />
      </div>
    </div>
  );
};

export default Dash;
