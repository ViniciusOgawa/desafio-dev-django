import { Routes, Route } from "react-router-dom";
import { Login } from "../pages/login";
import { Home } from "../pages/home";

const RoutesMain = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
};

export { RoutesMain };
