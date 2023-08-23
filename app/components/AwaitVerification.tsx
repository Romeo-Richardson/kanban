"use client";

import React, { FC, useEffect } from "react";
import { pusherClient } from "@/lib/pusherConfig";
import axios from "axios";
import toast from "react-hot-toast";

interface myProps {
  paramsId: string;
}

const AwaitVerification: FC<myProps> = ({ paramsId }: any) => {
  const verifyUser = async () => {
    await axios.post("../api/verifyemail", {
      verification: paramsId,
    });
  };

  useEffect(() => {
    pusherClient.subscribe(paramsId);

    pusherClient.bind("verification", (data: boolean) => {
      console.log(data);
    });

    toast.promise(verifyUser(), {
      loading: "Verifiying User",
      success: "Email Verified, you can close this tab.",
      error: "Unable to verify email, please try again.",
    });

    return () => {
      pusherClient.unsubscribe(paramsId);
    };
  }, []);

  return <></>;
};

export default AwaitVerification;
