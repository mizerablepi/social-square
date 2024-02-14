import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

function checkErrors() {
  return cookies().get("errors");
}

function Login() {
  if (cookies().get("token")) {
    redirect("/");
  }
  const errors = checkErrors();
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-116px)] md:min-h-screen">
      <div>
        <div>
          <h1 className="font-bold text-4xl pb-8 pl-2 sm:pl-0">Log In:</h1>
        </div>
        <div className="bg-gray-800 rounded-md w-screen sm:w-[25rem] p-6">
          <form action="/api/login" method="post" className="flex flex-col">
            <label htmlFor="username" className="font-bold text-lg pb-1">
              Username:{" "}
            </label>
            <input
              type="text"
              name="username"
              id="username"
              className="rounded bg-gray-600 px-2 py-1 mb-3 "
              required
            />
            <label htmlFor="password" className="font-bold text-lg pb-1">
              Password:{" "}
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="rounded bg-gray-600 px-2 py-1 mb-3 "
              required
            />
            {errors && (
              <div className="text-sm text-red-400">{errors.value}</div>
            )}
            <div className="flex mt-4 items-center justify-between">
              <button
                type="submit"
                className="font-bold rounded-md bg-blue-600 self-start px-3 py-1 "
              >
                Log In
              </button>
              <Link
                href="/signup"
                className="text-sm text-gray-400 underline cursor-pointer"
              >
                New User? Create an account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
