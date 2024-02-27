import GrayCard from "@/components/GrayCard";
import CommentCard from "./CommentCard";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import PageBar from "./Pagebar";
import { useRouter } from "next/navigation";
import { Oval } from "react-loader-spinner";

function CommentSection({ postId }: { postId: string }) {
  const query = useSearchParams();
  const router = useRouter();
  const path = usePathname();
  const [comments, setComments] = useState([]);
  useEffect(() => {
    fetch(
      `/api/post/${postId}/comments?page=${query.get("page") ?? 1}&sort=${
        query.get("sort") ?? -1
      }`
    )
      .then((res) => res.json())
      .then((res) => setComments(res.comments));
  }, [postId, query]);

  return (
    <>
      <div className="flex justify-between">
        <h2 className="font-semibold text-xl">Comments: </h2>
        <select
          name="comment_sort"
          id="comment_sort"
          className="mr-4 bg-gray-700 rounded p-1 font-bold"
          onChange={(e) =>
            router.replace(
              path +
                `?page=${query.get("page")}&sort=${e.target.value}#comments`
            )
          }
          value={query.get("sort") ?? "1"}
        >
          <option value="1">Oldest</option>
          <option value="-1">Newest</option>
        </select>
      </div>
      <hr className="mt-4 mb-2 border-slate-600" />
      {comments.length > 0 ? (
        <>
          {comments.map((comment: any) => {
            return <CommentCard comment={comment} key={comment._id} />;
          })}
        </>
      ) : (
        <div className="flex justify-center my-2">
          <Oval
            height="80"
            width="80"
            color="#53bfc5"
            secondaryColor="53bfc5"
            ariaLabel="oval-loading"
          />
        </div>
      )}
      <PageBar postId={postId} />
    </>
  );
}

export default CommentSection;
