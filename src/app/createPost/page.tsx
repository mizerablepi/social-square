"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

// using server actions
// import handleData from "../../components/handler";

function PostForm() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [errors, setErrors] = useState();
  return (
    <div className="flex flex-col items-center min-h-[calc(100vh-116px)] md:min-h-screen pt-8">
      <div>
        <div>
          <h1 className="font-bold text-4xl pb-8 pl-2 sm:pl-0">Create Post:</h1>
        </div>
        <div className="bg-gray-800 rounded-md w-screen sm:w-[25rem] p-6">
          <form
            // action="/api"
            method="post"
            encType="multipart/form-data"
            className="flex flex-col"
            onSubmit={(e: any) => {
              e.preventDefault();
              setPending(true);
              const data = new FormData();
              data.append("file", e.target.img.files[0]);
              data.append("text", e.target.text?.value);
              fetch("http://localhost:3000/api/post", {
                method: "post",
                body: data,
              })
                .then((res) => res.json())
                .then((json) => {
                  console.log(json);
                  if (json.success) {
                    console.log("FIRST");
                    router.push(json.url);
                  } else {
                    console.log("ERRS SET");
                    setErrors(json.msg);
                    setPending(false);
                  }
                });
            }}

            //* This is for storing images in mongodb itself
            // onSubmit={(e) => {
            //   e.preventDefault();
            //   const reader = new FileReader();
            //   reader.readAsDataURL(e.target.img.files[0]);
            //   reader.onload = () => {
            //     setImage(reader.result);
            //   };
            //   reader.onerror = (err) => {
            //     console.log(err);
            //   };
            // }}
          >
            <label htmlFor="text" className="font-bold text-lg mb-1">
              Text:{" "}
            </label>
            <textarea
              name="text"
              id="text"
              cols={30}
              rows={5}
              className="rounded p-2 mb-4 text-black resize-none"
              placeholder="Enter some post"
              required
            ></textarea>
            <label htmlFor="img" className="font-bold text-lg mb-1 ">
              Image:{" "}
            </label>
            <input type="file" name="img" id="img" className="mb-4" />
            {errors && <div className="text-sm text-red-400">{errors}</div>}
            <button
              type="submit"
              className="font-bold rounded-md bg-blue-600 self-start px-3 py-1 mt-4 disabled:bg-blue-500/60"
              disabled={pending}
            >
              {pending ? "Posting..." : "Post"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PostForm;
