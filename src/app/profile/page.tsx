"use client";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProfilePage() {
  const [data, setData] = useState({} as any);
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

  // const getUserDetails = async () => {};

  useEffect(() => {
    async function userData() {
      try {
        const res = await axios.get("/api/users/me");
        console.log(res);
        setData(res.data.data);
      } catch (error: any) {
        console.log(error.message);
      }
    }
    userData();
  }, []);

  return (
    <div className="font-sans flex bg-gradient-to-b from-red-400 to-red-300 flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-red-100 text-2xl p-4">Profile</h1>
      <hr />

      <div className="h-fit py-5 px-8 w-fit  border-4 border-gray-200 rounded-xl shadow-md flex flex-col items-center justify-center space-y-4">
        <h2>
          {!data ? (
            "Loading user data..."
          ) : (
            <div>
              <p className="p-2">
                <span className="text-red-500">User ID</span> : <Link href={`/profile/${data._id}`}>{data._id}</Link>
              </p>
              <p className="p-2"><span className="text-red-500">Name</span> : {data.username}</p>
              <p className="p-2"><span className="text-red-500">Email</span> : {data.email}</p>
            </div>
          )}
        </h2>
        <button
          onClick={handleLogout}
          className="bg-red-400 p-3 hover:bg-red-500 rounded-md"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}
