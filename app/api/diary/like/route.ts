import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../prisma/client';
import { cookies } from 'next/headers';
import { verifyToken } from '../../../lib/token';

export async function POST(req: NextRequest) {
  const { diaryId } = await req.json();

  console.log(diaryId);
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
  try {
    const userId = verifyToken(
      cookies().get('dreaming_accessToken')?.value ?? ''
    ).userId;

    const hasUserLikeDiary = await prisma.like.count({
      where: {
        memberId: userId + '',
        diaryId,
      },
    });
    console.log(hasUserLikeDiary);
    if (!hasUserLikeDiary) {
      try {
        const getDiaryLikesNumber = await prisma.like.create({
          data: {
            diaryId,
            memberId: userId + '',
          },
        });

        return NextResponse.json(JSON.stringify(getDiaryLikesNumber), {
          status: 200,
        });
      } catch (e) {
        console.error(e);
        return NextResponse.json(
          JSON.stringify({
            error: '좋아요를 할 수 없어요!',
          }),
          {
            status: 200,
          }
        );
      }
    }
    await prisma.like.delete({
      where: {
        memberId_diaryId: {
          memberId: userId + '',
          diaryId: diaryId,
        },
      },
    });
    return NextResponse.json(
      {
        data: '성공적으로 제거했어요!',
      },
      {
        status: 200,
      }
    );
  } catch (e) {
    return NextResponse.json(
      {
        error: '다이어리 좋아요를 할 수 없어요',
      },
      {
        status: 502,
      }
    );
  }
}
