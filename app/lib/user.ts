import prisma from '../../prisma/client';

interface createNewUserParms {
  id: string;
  name: string;
  email: string;
  image: string;
}

const createNewUser = async ({
  id,
  name,
  email,
  image,
}: createNewUserParms) => {
  const findUniqueUser = await prisma.member.findUnique({
    where: { id },
  });

  if (findUniqueUser) {
    return findUniqueUser;
  }

  await prisma.member.create({
    data: {
      id,
      name,
      email,
      picture: image,
      point: 0,
    },
  });
};

export { createNewUser };
