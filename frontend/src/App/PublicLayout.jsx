import React from "react";
import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <div className="h-screen w-full">
      <Outlet />
    </div>
  );
};

export default PublicLayout;
