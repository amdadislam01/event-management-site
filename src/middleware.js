import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware();

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};


// import { clerkMiddleware } from "@clerk/nextjs/server";

// export default clerkMiddleware({
//   publicRoutes: [
//     "/",          // public
//     "/login",     // public
//     "/sign-in",   // public
//     "/sign-up",   // public
//     "/all-events" // public
//   ],
// });

// export const config = {
//   matcher: [
//     "/((?!_next|.*\\..*).*)",
//     "/(api|trpc)(.*)",
//   ],
// };


// import { auth, clerkMiddleware } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";

// const publicRoutes = ["/", "/all-events", "/api/public"];

// export default clerkMiddleware((auth, req) => {
//   const { userId } = auth();

//   const url = req.nextUrl.pathname;

//   // If current route is public, allow
//   if (publicRoutes.some((route) => url.startsWith(route))) {
//     return NextResponse.next();
//   }

//   // If user not logged in, redirect to sign-in page
//   if (!userId) {
//     const signInUrl = new URL("/sign-in", req.url);
//     return NextResponse.redirect(signInUrl);
//   }

//   // If logged in, allow
//   return NextResponse.next();
// });

// export const config = {
//   matcher: ["/((?!_next|static|.*\\..*).*)"],
// };
