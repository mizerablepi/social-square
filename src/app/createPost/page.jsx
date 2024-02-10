"use client";

// using server actions
// import handleData from "../../components/handler";

function PostForm() {
  return (
    <form
      action="/api"
      method="post"
      encType="multipart/form-data"
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("file", e.target.img.files[0]);
        fetch("http://localhost:3000/api", { method: "post", body: data }).then(
          (res) => console.log(res)
        );
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
      <input type="file" name="img" id="img" />
      {/* <input type="text" name="test" id="test" /> */}
      <button type="submit">Submit</button>
      <br />
    </form>
  );
}

export default PostForm;
