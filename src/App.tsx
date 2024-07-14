import React from "react";
import Route from "./components/Route";
import Routes from "./components/Routes";
import { MemoryRouter } from "./components/router";
import Link from "./components/Link";
import Home from "./app/Home";
import Dash from "./app/Dash";
import Info from "./app/Info";
// import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

const App: React.FC<React.PropsWithChildren> = () => {
  return (
    <>
      <MemoryRouter>
        <Link to="/">home</Link>
        <Link to="/dash">dash</Link>
        <Link to="/dash/info">dash_info</Link>
        <Link to="/dash/a/b/info">dash_a_b_info</Link>
        <Link to="/dash/a/b/x">dash_a_b_x</Link>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dash" element={<Dash />}>
            <Route path="a/b/info" element={<Info />} />
            <Route path="info" element={<>hello single info</>} />
          </Route>
          <Route path="/dash/a/b/info" element={<div>absolute info x</div>} />
          <Route path="/dash/a/b/x" element={<div>dash a b x</div>} />
        </Routes>
      </MemoryRouter>
    </>
  );
};

export default App;
