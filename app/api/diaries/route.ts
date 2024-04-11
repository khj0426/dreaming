import prisma from '../../prisma/client';

const getDiariesBySearchKeyword = async (
  keyword: string,
  page: number
) => {
  try {
    let skip = 0;
    const take = 15;
    if (page > 1) {
      skip = (page - 1) * take;
    }

    if (keyword.length === 0) {
      const total = await prisma.diary.count({
        where: {
          isShare: true,
        },
      });

      const diaries = await prisma.diary.findMany({
        where: {
          isShare: true,
        },
        skip,
        take,
        orderBy: {
          updated_At: 'desc',
        },
      });

      return { diaries, total };
    }

    const total = await prisma.diary.count({
      where: {
        isShare: true,
        OR: [
          {
            title: {
              contains: keyword,
            },
          },
          {
            contents: {
              contains: keyword,
            },
          },
        ],
      },
    });

    const diaries = await prisma.diary.findMany({
      where: {
        isShare: true,
        OR: [
          {
            title: {
              contains: keyword,
            },
          },
          {
            contents: {
              contains: keyword,
            },
          },
        ],
      },
      skip,
      take,
      orderBy: {
        updated_At: 'desc',
      },
    });

    return { diaries, total };
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export { getDiariesBySearchKeyword };
