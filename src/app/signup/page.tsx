"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function SignUpPage() {
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);

      console.log("SignUp Success :", response.data);
      router.push("/login");
    } catch (error: any) {
      console.log("SignUp Failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.username.length > 0 &&
      user.password.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="font-sans flex bg-gradient-to-b from-red-400 to-red-300 flex-col items-center justify-center min-h-screen py-2">
      <h1 className="p-4 text-3xl ">{loading ? "processing" : "SignUp"}</h1>
      <div
        id="form_wrapper"
        className="h-fit py-4  px-16 w-fit  border-4 border-gray-200 rounded-xl shadow-md flex flex-col items-center justify-center space-y-4
        "
      >
        <hr />
        <label htmlFor="username" className="text-red-200">
          Username
        </label>
        <input
          className="p-2 mb-6 text-black border-2 border-gray-200 rounded-md outline-none focus:border-gray-400"
          type="text"
          id="username"
          value={user.username}
          placeholder="Username..."
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />

        <label className="text-red-200" htmlFor="email">
          Email
        </label>
        <input
          className="p-2 mb-6 text-black border-2 border-gray-200 rounded-md outline-none focus:border-gray-400"
          type="text"
          id="email"
          value={user.email}
          placeholder="Email..."
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />

        <label className="text-red-200" htmlFor="password">
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
          onClick={onSignup}
        >
          {buttonDisabled ? "No SignUp" : "SignUp"}
        </button>
        <Link href="/login">
          <span className="text-blue-500">Visit Login Page</span>
        </Link>
      </div>
    </div>
  );
}
