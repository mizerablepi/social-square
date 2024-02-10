import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {}
export const config = {
  matcher: [`/((?!api|_next/static|_next/image|favicon.ico).*)`],
};
