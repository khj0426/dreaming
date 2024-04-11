import prisma from '../../prisma/client';

const getDiariesBySearchKeyword = async (keyword: string, page: number) => {
  try {
    if (keyword.length === 0) {
      const getAllDiaries = await prisma.diary.count({
        where: {
          isShare: true,
        },
        orderBy: {
          updated_At: 'desc',
        },
      });
      const getDiariesFromKeyword = await prisma.diary.findMany({
        where: {
          isShare: true,
        },
        skip: page,
        take: 15,

        orderBy: {
          updated_At: 'desc',
        },
      });
      return { diaries: getDiariesFromKeyword, total: getAllDiaries };
    }

    const getAllDiaries = await prisma.diary.count({
      where: {
        isShare: true,
        title: {
          search: `${keyword}*`,
        },
        contents: {
          search: `${keyword}*`,
        },
      },
      orderBy: {
        updated_At: 'desc',
      },
    });

    const getDiariesFromKeyword = await prisma.diary.findMany({
      where: {
        isShare: true,
        title: {
          search: `${keyword}*`,
        },
        contents: {
          search: `${keyword}`,
        },
      },
      skip: page,
      take: 15,

      orderBy: {
        updated_At: 'desc',
      },
    });
    return { diaries: getDiariesFromKeyword, total: getAllDiaries };
  } catch (e) {
    throw e;
  }
};

export { getDiariesBySearchKeyword };
