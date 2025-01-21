import { useEffect } from "react";
import Link from "../components/Link";
import Outlet from "../components/Outlet";

const Home = () => {
  useEffect(() => {
    console.info(">>>HOME装载");
    return () => {
      console.info("HOME卸载<<<<<");
    };
  }, []);
  return (
    <div>
      <h1>Home</h1>
      <nav>
        <Link to="/course">课程</Link>
        <Link to="/events">活动</Link>
      </nav>
      <section>
        <Outlet />
      </section>
    </div>
  );
};
export default Home;
