import { hash, compare } from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import {
  writeUser,
  findUserByEmail,
} from "~/server/database/repositories/userRepository";

export const createUser = async (username, email, password) => {
  const hashedPassword = await hash(password, 10);
  const data = {
    username,
    email,
    password: hashedPassword,
    uuid: uuidv4(),
  };
  return await writeUser(data);
};

export const verifyCredentials = async (email, password) => {
  const user = await findUserByEmail(email);

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isPasswordValid = await compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
  }
  return user;
};
