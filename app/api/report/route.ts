import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '../../lib/token';
import {
  getAllPosts,
  getCommentCountCreatedByUser,
  getLikeCountCreatedByUser,
} from '../../lib/report';
import prisma from '../../../prisma/client';

export async function GET(req: NextRequest) {
  try {
    const userId = verifyToken(
      cookies().get('dreaming_accessToken')?.value ?? ''
    ).userId;
  } catch (e) {
    return new Response(
      JSON.stringify({
        error: '토큰이 만료되었습니다.',
      }),
      {
        status: 401,
      }
    );
  }

  const userId = verifyToken(
    cookies().get('dreaming_accessToken')?.value ?? ''
  ).userId;
  try {
    const posts = await getAllPosts();
    const likes = await getLikeCountCreatedByUser(userId + '');
    const comments = await getCommentCountCreatedByUser(userId + '');
    const Response = {
      allCount: posts.total,
      sharedCount: posts.sharedDiaries,
      notSharedCount: posts.notSharedDiaries,
      allUserCount: posts.sharedDiaries + posts.notSharedDiaries,
      likeCount: likes,
      commentCount: comments,
    };
    return NextResponse.json(Response, {
      status: 200,
    });
  } catch (e) {
    return NextResponse.json(
      { error: '통계를 조회할 수 없어요!' },
      {
        status: 502,
      }
    );
  }
}
