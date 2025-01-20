import React from "react";
import Route from "./components/Route";
import Routes from "./components/Routes";
import Link from "./components/Link";
// import { MemoryRouter as Router } from "./components/router/memory-router";
import Router from "./components/router/BrowserRouter";
// import Router from "./components/router/HashRouter";
import Home from "./app/Home";
import { Login } from "./app/login";
import { Register } from "./app/register";
import { Course } from "./app/course";
import { Events } from "./app/events";
import { Backend } from "./app/course/backend";
import { Frontend } from "./app/course/frontend";
import { Android } from "./app/course/android";
import { IOS } from "./app/course/ios";
import { Book } from "./app/book";
// import { HashRouter, Link, Route, Routes } from "react-router-dom";

const App: React.FC<React.PropsWithChildren> = () => {
  return (
    <>
      <Router>
        <Link to="/">主页</Link>
        <Link to="/login">登录</Link>
        <Link to="/register">注册</Link>
        <Routes>
          <Route path="/login" element={<Login />} memo />
          <Route path="/register" element={<Register />} memo />
          <Route path="/" element={<Home />}>
            <Route path="course" element={<Course />}>
              <Route path="backend" element={<Backend />} />
              <Route path="frontend" element={<Frontend />}>
                <Route path=":id" element={<Book />} />
              </Route>
              <Route path="android" element={<Android />} />
              <Route path="ios" element={<IOS />} />
            </Route>
            <Route path="/events" element={<Events />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
