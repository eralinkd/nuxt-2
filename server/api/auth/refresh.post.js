import { verifyRefreshToken, generateTokens } from "~/server/services/tokenService";
import { findUserByUuid } from "~/server/database/repositories/userRepository";

export default defineEventHandler(async (event) => {
  try {
    const { refreshToken } = await readBody(event);
    
    if (!refreshToken) {
      throw createError({
        statusCode: 401,
        message: 'Refresh token is required'
      });
    }

    const decoded = verifyRefreshToken(refreshToken);
    
    if (!decoded) {
      throw createError({
        statusCode: 401,
        message: "Invalid refresh token",
      });
    }

    const user = await findUserByUuid(decoded.uuid);
    
    if (!user) {
      throw createError({
        statusCode: 401,
        message: "User not found",
      });
    }

    const tokens = generateTokens(user);

    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken
    };
  } catch (error) {
    throw createError({
      statusCode: 401,
      message: error.message
    });
  }
}); 