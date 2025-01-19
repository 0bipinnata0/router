import { Link } from "../..";
import Outlet from "../../components/Outlet";

export function Course() {
  return (
    <div>
      课程
      <aside>
        <Link to="/course/backend">后端</Link>
        <Link to="/course/frontend">前端</Link>
        <Link to="/course/android">Android</Link>
        <Link to="/course/ios">iOS</Link>
      </aside>
      <Outlet />
    </div>
  );
}
