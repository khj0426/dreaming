import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';
import { verifyToken } from '../../lib/token';
import createNewLottoNumber from '../../lib/lotto';
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
    const newLottoNum = await createNewLottoNumber(userId + '');
    const getPoint = await prisma.member.findUnique({
      where: {
        id: userId + '',
      },
    });
    if (getPoint && getPoint.point >= 300)
      await prisma.member.update({
        where: {
          id: userId + '',
        },
        data: {
          point: getPoint?.point - 300,
        },
      });
    return new Response(JSON.stringify(newLottoNum), {
      status: 200,
    });
  } catch (e) {
    return new Response(
      JSON.stringify({
        error: '로또 번호를 발급할 수 없습니다',
      }),
      {
        status: 502,
      }
    );
  }
}
