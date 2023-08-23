"use client";

import React, { FC, useEffect } from "react";
import Login from "../components/Login";
import { toast } from "react-hot-toast/headless";

const page: FC = () => {
  useEffect(() => {
    toast("Hello World");
  }, []);
  return (
    <main className="container h-screen flex justify-center items-center">
      <Login></Login>
    </main>
  );
};

export default page;
