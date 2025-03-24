import prisma from "../database/client";

export default defineEventHandler(async (event) => {
  try {
    // Проверяем подключение
    await prisma.$queryRaw`SELECT 1`;
    
    // Проверяем таблицу пользователей
    const userCount = await prisma.user.count();
    
    // Получаем информацию о таблицах
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `;
    
    // Проверяем наличие переменных окружения
    const envCheck = {
      hasDatabaseUrl: !!process.env.DATABASE_URL,
      databaseUrlType: process.env.DATABASE_URL ? process.env.DATABASE_URL.split('://')[0] : null,
      nodeEnv: process.env.NODE_ENV
    };
    
    return {
      status: 'success',
      message: 'Database connection successful',
      timestamp: new Date().toISOString(),
      details: {
        userCount,
        tables: tables.map(t => t.table_name),
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