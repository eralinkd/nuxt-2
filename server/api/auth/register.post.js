import { createUser } from "~/server/services/userService";
import { generateTokens } from "~/server/services/tokenService";
export default defineEventHandler(async (event) => {
  try {
    const { username, email, password } = await readBody(event);
    const user = await createUser(username, email, password);
    const tokens = generateTokens(user);
    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  } catch (error) {
    throw createError({
      statusCode: 400,
      message: error.message,
    });
  }
});