"use client";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function ProfilePage() {
  const [data, setData] = useState("Nothing");
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout Successful");
      router.push("/login");
    } catch (error: any) {
      console.log("Error :", error.message);
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    console.log(res);
    setData(res.data.data._id);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p className="p-2">Profile Page</p>
      <h2>
        {data === "Nothing" ? (
          "Nothing"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <button onClick={handleLogout} className="p-2 bg-stone-500">
        Log Out
      </button>
      <button onClick={getUserDetails} className="bg-red-500">
        GetUserDetails{" "}
      </button>
    </div>
  );
}
