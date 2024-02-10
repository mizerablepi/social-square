import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

function checkErrors() {
  return cookies().get("errors");
}

function SignUp() {
  if (cookies().get("token")) {
    redirect("/");
  }
  const errors = checkErrors();
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div>
        <div>
          <h1 className="font-bold text-4xl pb-8 pl-2 sm:pl-0">Sign Up:</h1>
        </div>
        <div className="bg-gray-800 rounded-md w-screen sm:w-[25rem] p-6">
          <form action="/api/signup" method="post" className="flex flex-col">
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
            <label htmlFor="email" className="font-bold text-lg pb-1">
              Email:{" "}
            </label>
            <input
              type="email"
              name="email"
              id="email"
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
            <label
              htmlFor="confirm_password"
              className="font-bold text-lg pb-1"
            >
              Confirm Password:{" "}
            </label>
            <input
              type="password"
              name="confirm_password"
              id="confirm_password"
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
                Sign Up
              </button>
              <Link
                href="/login"
                className="text-sm text-gray-400 underline cursor-pointer"
              >
                Already have an account?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
