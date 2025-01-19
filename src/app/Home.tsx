import Link from "../components/Link";
import Outlet from "../components/Outlet";

const Home = () => (
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

export default Home;
