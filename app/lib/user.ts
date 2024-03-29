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

  console.log(findUniqueUser);

  if (findUniqueUser) {
    return findUniqueUser;
  }

  console.log(id, name, email, image);
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
