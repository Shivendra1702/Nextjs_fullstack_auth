"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
// import { sendEmail } from "@/helpers/mailer";

export default function LoginPage() {
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login Successful :", response.data);
      toast.success("Login Success");
      router.push("/profile");
    } catch (error: any) {
      console.log("Login Error :", error.message);
      toast.error("Error in Login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  async function handleResetPasswordEmail() {
    if (!user.email) {
      toast.error("Please enter email to reset password");
      console.log("Please enter email to reset password");
      throw new Error("Please enter email to reset password");
    }
    console.log(user.email);
    try {
      const response = await axios.post("/api/users/resetpasswordemail", user);
      console.log("Reset Password Email Sent :", response.data);
      setEmailSent(true);
    } catch (error: any) {
      console.log("Error in sending Email for password reset :", error.message);
      // toast.error("Error in Login");
    }
  }
  return (
    <div className="font-sans flex bg-gradient-to-b from-red-400 to-red-300 flex-col items-center justify-center min-h-screen py-2">
      <h1 className="p-4 text-3xl ">{loading ? "Processing .." : "Login"}</h1>
      {emailSent ? (
        <div>
          <h1 className="p-4 text-3xl text-red-400">Reset Password Email Sent</h1>
        </div>
      ) : (
        <div
          id="form_wrapper"
          className="h-fit py-5 px-8 w-fit  border-4 border-gray-200 rounded-xl shadow-md flex flex-col items-center justify-center space-y-4"
        >
          <hr />

          <label htmlFor="email" className="text-red-200">
            Email
          </label>
          <input
            className="p-2 mb-6 text-stone-600 border-2 border-gray-200 rounded-md outline-none focus:border-gray-400"
            type="text"
            id="email"
            value={user.email}
            placeholder="Email..."
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />

          <label htmlFor="password" className="text-red-200">
            Password
          </label>
          <input
            className="p-2 mb-6 text-black border-2 border-gray-200 rounded-md outline-none focus:border-gray-400"
            type="password"
            id="password"
            value={user.password}
            placeholder="Password..."
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />

          <button
            className="bg-red-400 p-3 hover:bg-red-500 rounded-md"
            onClick={onLogin}
          >
            {buttonDisabled ? "No Login" : "Login Here"}
          </button>
          <div className="flex">
            {/* <Link href="/resetpassword">
            <span className="text-blue-500">Forgot Password</span>
          </Link> */}
            <span
              onClick={handleResetPasswordEmail}
              className="text-blue-500 cursor-pointer"
            >
              Forgot Password
            </span>
            <span className="px-2">|</span>
            <Link href="/signup">
              <span className="text-blue-500">Visit Sign Up Page</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
