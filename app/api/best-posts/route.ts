import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../prisma/client';

export async function GET(req: NextRequest) {
  const getAllBestPosts = await prisma.diary.findMany({
    orderBy: {
      like: 'desc',
    },
    take: 5,
  });
  console.log(getAllBestPosts);
  return NextResponse.json(JSON.stringify(getAllBestPosts), {
    status: 200,
  });
}
