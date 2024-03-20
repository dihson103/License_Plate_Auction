import { NextRequest, NextResponse } from 'next/server'
import { getAuthFromCookie } from './app/actions/auth.action'

export const middleware = (request: NextRequest) => {
  if (
    request.nextUrl.pathname.startsWith('/users') ||
    request.nextUrl.pathname.startsWith('/admins') ||
    request.nextUrl.pathname.startsWith('/auctions') ||
    request.nextUrl.pathname.startsWith('/dashboard')
  ) {
    const authData = getAuthFromCookie()
    return authData ? NextResponse.next() : NextResponse.redirect(new URL('/login', request.url))
  }
}
