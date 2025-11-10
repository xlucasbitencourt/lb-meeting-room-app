import { Routes, Route } from "react-router";
import Home from "@pages/home/Home";
import About from "@pages/about/About";
import NotFound from "@pages/not-found/NotFound";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
