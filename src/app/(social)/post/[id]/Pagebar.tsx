import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Pagination } from "@mui/material";

function PageBar({ postId }: { postId: string }) {
  const router = useRouter();
  const path = usePathname();
  const query = useSearchParams();
  const [pagesCount, setPagesCount] = useState(1);

  useEffect(() => {
    fetch(`/api/post/${postId}/comments/count`)
      .then((res) => res.json())
      .then((res) => setPagesCount(res.count));
  }, [postId]);

  return (
    <div className="flex items-center justify-between border-t border-gray-600 px-4 py-3 sm:px-6 text-white">
      <div className="flex flex-1 justify-between sm:hidden">
        <a
          href="#"
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-slate-950"
        >
          Previous
        </a>
        <a
          href="#"
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-slate-950"
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-center">
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm text-white"
            aria-label="Pagination"
          >
            <Pagination
              count={pagesCount}
              page={+(query.get("page") ?? 1)}
              color="primary"
              shape="rounded"
              onChange={(e, value) => {
                e.preventDefault();
                router.push(
                  path +
                    `?page=${value}&sort=${query.get("sort") ?? "-1"}#comments`
                );
              }}
              className="text-white"
            />
          </nav>
        </div>
      </div>
    </div>
  );
}

export default PageBar;
