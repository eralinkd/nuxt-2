import prisma from "../database/client";

export default defineEventHandler(async (event) => {
  try {
    // Проверяем подключение через простой запрос
    await prisma.$queryRaw`SELECT 1`;
    console.log('Подключение к базе данных успешно установлено');
    
    // Проверяем таблицу пользователей
    const userCount = await prisma.user.count();
    console.log('Количество пользователей в таблице:', userCount);
    
    // Проверяем наличие переменных окружения
    const envCheck = {
      hasDatabaseUrl: !!process.env.DATABASE_URL,
      databaseUrlType: process.env.DATABASE_URL ? process.env.DATABASE_URL.split('://')[0] : null,
      nodeEnv: process.env.NODE_ENV
    };
    console.log('Информация о переменных окружения:', envCheck);
    
    return {
      status: 'success',
      message: 'Database connection successful',
      timestamp: new Date().toISOString(),
      details: {
        userCount,
        env: envCheck
      }
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