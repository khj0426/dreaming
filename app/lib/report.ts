import prisma from '../../prisma/client';

const getAllPosts = async () => {
  const getPostCount = await prisma.diary.findMany();
  const getIsSharedPostCount = getPostCount.filter(
    (diary) => diary.isShare === true
  ).length;
  const getIsNotSharedPostCount = getPostCount.length - getIsSharedPostCount;
  return {
    total: getPostCount.length,
    sharedDiaries: getIsSharedPostCount,
    notSharedDiaries: getIsNotSharedPostCount,
  };
};

//사용자가 쓴 다이어리에 달린 좋아요 수
const getLikeCountCreatedByUser = async (id: string) => {
  const likeCount = await prisma.like.count({
    where: {
      memberId: id + '',
    },
  });
  return likeCount;
};

//사용자가 쓴 다이어리에 달린 댓글 수
const getCommentCountCreatedByUser = async (id: string) => {
  const commentCount = await prisma.comment.count({
    where: {
      writerId: id + '',
    },
  });
  return commentCount;
};

export { getCommentCountCreatedByUser, getAllPosts, getLikeCountCreatedByUser };
