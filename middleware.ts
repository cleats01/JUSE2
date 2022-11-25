import { getToken } from 'next-auth/jwt';
import { NextFetchEvent, NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  if (req.cookies.has('next-auth.session-token')) console.log('로그인');
}
