"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import axios from "axios";
export default function ResetPassword() {
  // const [email, setEmail] = useState(""); // [state, setState
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [samePassword, setSamePassword] = useState(false);
  const router = useRouter();
  const [token, setToken] = useState("");

  const handleResetPassword = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/resetpassword", {
        // email,
        newPassword,token
      });
      console.log("Reset Password Success :", response.data);
      router.push("/login");
    } catch (error: any) {
      console.log("Reset Password Failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (newPassword === confirmPassword) {
      setSamePassword(true);
    } else {
      setSamePassword(false);
    }
  }, [newPassword, confirmPassword]);

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  return (
    <div className="font-sans flex bg-gradient-to-b from-red-400 to-red-300 flex-col items-center justify-center min-h-screen py-2">
      <h1 className="p-4 text-3xl ">
        {loading ? "Processing .." : "Reset password"}
      </h1>
      <hr />
      <div className="h-fit py-5 px-8 w-fit  border-4 border-gray-200 rounded-xl shadow-md flex flex-col items-center justify-center space-y-4">
        {/* <label className="text-red-200" htmlFor="p_email">
          Enter Email
        </label>
        <input
          id="p_email"
          className="p-2 mb-6 text-black border-2 border-gray-200 rounded-md outline-none focus:border-gray-400"
          type="text"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /> */}

        <label className="text-red-200" htmlFor="newpassword">
          New password
        </label>
        <input
          id="newpassword"
          className="p-2 mb-6 text-black border-2 border-gray-200 rounded-md outline-none focus:border-gray-400"
          type="text"
          placeholder="Enter New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <label className="text-red-200" htmlFor="confirmpassword">
          Confirm password
        </label>
        <input
          id="confirmpassword"
          className="p-2 mb-6 text-black border-2 border-gray-200 rounded-md outline-none focus:border-gray-400"
          type="text"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          disabled={!samePassword}
          className="bg-red-400 p-3 hover:bg-red-500 rounded-md"
          onClick={handleResetPassword}
        >
          Reset Password
        </button>
      </div>
    </div>
  );
}
