import { Link } from "../../..";
import Outlet from "../../../components/Outlet";

export function Frontend() {
  return (
    <div>
      <div>
        <Link to="/course/frontend/978-7-115-38888-9">
          JavaScript设计模式与开发实践
        </Link>
        <Link to="/course/frontend/978-7-115-45841-4">
          Head First JavaScript程序设计
        </Link>
      </div>
      <Outlet />
    </div>
  );
}
