import prisma from "../client";

export const writeUser = async (user) => {
  const createdUser = await prisma.user.create({
    data: {
      email: user.email,
      username: user.username,
      password: user.password,
      uuid: user.uuid,
    },
  });
  return createdUser;
};

export const findUserByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
};

export const findUserByUuid = async (uuid) => {
  return await prisma.user.findUnique({
    where: {
      uuid,
    },
  });
};
