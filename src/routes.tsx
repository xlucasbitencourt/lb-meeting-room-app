import { Routes, Route, Navigate } from "react-router";
import NotFound from "@pages/not-found/NotFound";
import Layout from "@components/Layout";
import Bookings from "@pages/Bookings";
import Rooms from "@pages/Rooms";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate replace to="/bookings" />} />
        <Route path="rooms" element={<Rooms />} />
        <Route path="bookings" element={<Bookings />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
