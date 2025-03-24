import { verifyCredentials } from "~/server/services/userService";
import { generateTokens } from "~/server/services/tokenService";

export default defineEventHandler(async (event) => {
  try {
    const { email, password } = await readBody(event);
    const user = await verifyCredentials(email, password);
    const tokens = generateTokens(user);

    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  } catch (error) {
    throw createError({
      statusCode: 401,
      message: error.message,
    });
  }
});
