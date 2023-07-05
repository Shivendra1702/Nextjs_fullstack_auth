"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios  from "axios";
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
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="p-4">{loading ? "processing" : "SignUp"}</h1>
      <hr />
      <label htmlFor="username">username</label>
      <input
        className="p-2 mb-6 text-black"
        type="text"
        id="username"
        value={user.username}
        placeholder="Username..."
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />

      <label htmlFor="email">email</label>
      <input
        className="p-2 mb-6 text-black"
        type="text"
        id="email"
        value={user.email}
        placeholder="Email..."
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />

      <label htmlFor="password">password</label>
      <input
        className="p-2 mb-6 text-black"
        type="password"
        id="password"
        value={user.password}
        placeholder="Password..."
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />

      <button className="p-2 mb-4 bg-stone-500" onClick={onSignup}>
        {buttonDisabled ? "No SignUp" : "SignUp"}
      </button>
      <Link href="/login">Visit Login Page</Link>
    </div>
  );
}
