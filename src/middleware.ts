import { NextRequest, NextResponse } from "next/server";
import { Verification } from "./lib/auth";

export async function middleware(request: NextRequest) {
  // const url = request.nextUrl;
  // const user = request.cookies.get('current-user');

  // const verifiedToken = user && (await Verification(user.value).catch(err => {
  //   console.log(err);
  // }));
  
  // if(url.pathname.startsWith('/_next') || url.pathname.startsWith('/api/auth/')) {
  //   return NextResponse.next();
  // }

  // if(verifiedToken && url.pathname === '/') {
  //   return NextResponse.next();
  // }

  // if (!verifiedToken && url.pathname !== '/'
  //     && url.pathname !== '/register'
  //     && !url.pathname.startsWith('/_next') 
  //     && !url.pathname.startsWith('/api/auth')
  //   ) {
  //   return NextResponse.redirect(new URL('/', url));
  // }
}