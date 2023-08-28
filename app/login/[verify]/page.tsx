import AwaitVerification from "@/app/components/AwaitVerification";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import React, { FC } from "react";

const VerificationPage = ({ params }: { params: { verify: string } }) => {
  return (
    <main className="container h-screen flex justify-center items-center">
      <AwaitVerification paramsId={params.verify}></AwaitVerification>
    </main>
  );
};

export default VerificationPage;
