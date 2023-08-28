"use client";
import { pusherClient } from "@/lib/pusherConfig";
import React, { FC, useEffect, useState, useRef } from "react";
import { useLoginStore } from "../helper/loginstore";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { connect } from "http2";

const SignupPortion: FC = () => {
  const usernameInputref = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const { createUser, setUsername, setPassword, setEmail, setIsVerified } =
    useLoginStore();

  return (
    <>
      <form
        onSubmit={(data) => {
          toast.promise(createUser(data), {
            loading: "Creating User",
            success: "User Created, verify email to login.",
            error: "Failed to Create User",
          });
          if (
            usernameInputref.current &&
            emailInputRef.current &&
            passwordInputRef.current
          ) {
            usernameInputref.current.value = "";
            emailInputRef.current.value = "";
            passwordInputRef.current.value = "";
          }
        }}
        className=" grow w-full p-4 gap-4 flex flex-col"
      >
        <h1 className="text-black">Sign up here to register an account</h1>
        <label htmlFor="Username" className=" hover: cursor-text">
          Username
        </label>
        <input
          type="text"
          name="Username"
          ref={usernameInputref}
          required
          placeholder="Username"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setUsername(e.target.value);
          }}
          className="h-12 border-[1px] border-purple-300 rounded-md px-1"
        />
        <label htmlFor="Email" className=" hover: cursor-text">
          Email
        </label>
        <input
          type="text"
          name="Email"
          ref={emailInputRef}
          required
          placeholder="Email"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setEmail(e.target.value);
          }}
          className="h-12 border-[1px] border-purple-300 rounded-md px-1"
        />
        <label htmlFor="Password" className=" hover: cursor-text">
          Password
        </label>
        <input
          type="password"
          name="Password"
          ref={passwordInputRef}
          required
          placeholder="Password"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(e.target.value);
          }}
          className="h-12 border-[1px] border-purple-300 rounded-md px-1"
        />
        <button
          type="submit"
          className=" text-green-900 p-2 bg-green-300 rounded hover:bg-green-400 active:bg-green-600"
        >
          <strong>Sign up</strong>
        </button>
      </form>
    </>
  );
};

const LoginPortion: FC = () => {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const { login } = useLoginStore();

  return (
    <form
      onSubmit={(e) => {
        toast.promise(login(e), {
          loading: "Logging in",
          success: "Login Successful",
          error: "Failed to login",
        });
        if (emailInputRef.current && passwordInputRef.current !== null) {
          emailInputRef.current.value = "";
          passwordInputRef.current.value = "";
        }
      }}
      className=" grow w-full p-4 gap-4 flex flex-col"
    >
      <h1 className="text-black">Login here if you already have an account</h1>
      <label htmlFor="Email" className=" hover: cursor-text">
        Email
      </label>
      <input
        type="text"
        name="Email"
        ref={emailInputRef}
        required
        placeholder="Email"
        className="h-12 border-[1px] border-purple-300 rounded-md px-1"
      />
      <label htmlFor="Password" className=" hover: cursor-text">
        Password
      </label>
      <input
        type="password"
        name="Password"
        ref={passwordInputRef}
        required
        placeholder="Password"
        className="h-12 border-[1px] border-purple-300 rounded-md px-1"
      />
      <button
        type="submit"
        className=" text-green-900 p-2 bg-green-300 rounded hover:bg-green-400 active:bg-green-600"
      >
        <strong>Login</strong>
      </button>
    </form>
  );
};

const Login: FC = () => {
  const [isSignup, setIsSignup] = useState<boolean>(false);

  const { push } = useRouter();

  const { connectionName, setIsVerified, email, isVerified } = useLoginStore();

  const authenticateUser = async (id: string) => {
    const auth = await axios.post("/api/firstlogin", { id: id });
    return auth;
  };

  useEffect(() => {
    if (connectionName !== null) {
      console.log(connectionName);
      pusherClient.subscribe(connectionName);

      pusherClient.bind("verification", (data: boolean) => {
        console.log(data);
        toast.promise(authenticateUser(connectionName), {
          loading: `Please verify email sent to ${email}`,
          success: "Logged in Successfully",
          error: "Unable to verify user",
        });
        setIsVerified(data);
      });
    }

    return () => {
      pusherClient.unsubscribe(connectionName!);
    };
  }, [connectionName]);

  useEffect(() => {
    if (isVerified) {
      toast("Logging In");
      push(`/home/${connectionName}`);
    }
    console.log("Trolling");
  }, [isVerified]);

  return (
    <div
      className={`${
        isSignup ? "h-[485px]" : "h-96"
      } lg:w-[600px] xl:w-[650px] bg-white rounded-md relative flex flex-col shadow-md shadow-purple-600 duration-300 ease-in-out `}
    >
      <div className="w-full bg-white h-12 rounded-t-md flex border-b-[1px] border-gray-300">
        <div
          className="w-1/2 h-full flex items-center justify-center hover:cursor-pointer hover:bg-gray-200 rounded-tl-md"
          onClick={() => {
            setIsSignup(false);
          }}
        >
          <p className=" text-purple-500">Login</p>
        </div>
        <div
          className="w-1/2 h-full flex items-center justify-center hover:cursor-pointer hover:bg-gray-200 border-l-gray-300 border-l-[1px] rounded-tr-md"
          onClick={() => {
            setIsSignup(true);
          }}
        >
          <p className=" text-purple-500">Sign Up</p>
        </div>
      </div>
      {isSignup ? (
        <SignupPortion></SignupPortion>
      ) : (
        <LoginPortion></LoginPortion>
      )}
    </div>
  );
};

export default Login;
