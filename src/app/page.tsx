"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
export default function Home() {

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

  return (
    <main>
      <div className="h-screen bg-gradient-to-b from-red-400 to-red-300 flex justify-center items-center flex-col">
        <h1 className="text-3xl m-4">Homepage</h1>
        <button
        className="bg-red-400 p-3 hover:bg-red-500 rounded-md"
        onClick={handleLogout}
      >
        LogOut
      </button>
      </div>
      
    </main>
  );
}
