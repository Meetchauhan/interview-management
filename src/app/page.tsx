import Link from "next/link";

export default function Home() {
 

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
      <h1 className="text-4xl font-bold text-indigo-700 mb-2">Welcome to MetizIQ</h1>
      <p className="text-lg text-gray-700 mb-6 text-center max-w-xl">
       AI-powered interviews made easy. Sign up to create, manage, and analyze interviews with powerful automation and insights.
      </p>
      <div className="flex gap-4">
        <Link href="/sign-in" className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition">Sign In</Link>
        <Link href="/sign-up" className="px-6 py-2 border border-indigo-600 text-indigo-600 rounded hover:bg-indigo-50 transition">Sign Up</Link>
      </div>
      <footer className="mt-12 text-gray-400 text-sm">Powered by Metizsoft</footer>
    </main>
  );
} 
