import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

export async function middleware(req) {
  if (req.nextUrl.pathname === '/') {
    const session = await getToken({
      req,
      secret: process.env.JWT_SECRET,
      secureCookie: process.env.NODE_ENV === 'production'
    })

    if (!session) return NextResponse.redirect(new URL('/home', req.url))
  }
}

// import { getToken } from 'next-auth/jwt'
// import { NextResponse } from 'next/server'

// export async function middleware(req) {
//   // return early if url isn't supposed to be protected
//   if (!req.url.includes('/')) {
//     return NextResponse.next()
//   }

//   const session = await getToken({ req, secret: process.env.JWT_SECRET })
//   // You could also check for any property on the session object,
//   // like role === "admin" or name === "John Doe", etc.
//   if (!session) return NextResponse.redirect(new URL('/home', req.url))

//   // If user is authenticated, continue.
//   return NextResponse.next()
// }
