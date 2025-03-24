import prisma from "../database/client";

export default defineEventHandler(async (event) => {
  try {
    // Проверяем подключение к базе данных
    await prisma.$queryRaw`SELECT 1`;
    
    return {
      status: 'success',
      message: 'Database connection successful',
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Database connection error:', error);
    throw createError({
      statusCode: 500,
      message: 'Database connection failed',
      error: error.message
    });
  }
}); 