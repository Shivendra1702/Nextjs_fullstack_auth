export default function UserProfile({ params }: any) {
  return (
    <div className="font-sans flex bg-gradient-to-b from-red-400 to-red-300 flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-red-600 text-4xl">Profile Page</h1>
      <hr />
      <p className="text-4xl">USER-ID {params.id}</p>
    </div>
  );
}
