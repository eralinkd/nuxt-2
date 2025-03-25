import { verifyCredentials } from "~/server/services/userService";
import { generateTokens } from "~/server/services/tokenService";

export default defineEventHandler(async (event) => {
  const sql = usePostgres()
  const test = await sql`SELECT 1`
  event.waitUntil(sql.end())
  return {
    test: test
  }
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
