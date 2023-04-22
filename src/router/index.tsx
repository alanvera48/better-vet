import Home from "../pages/Home";
import { Route, Routes } from "react-router-dom";
import RestaurantDetail from "../pages/RestaurantDetail";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurant-detail" element={<RestaurantDetail />} />
    </Routes>
  );
};

export default Router;
