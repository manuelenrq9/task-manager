import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

// In the new version, we pass the URL directly to the constructor 
// or let it pull from the config if the environment supports it.
export const prisma = 
  globalForPrisma.prisma || 
  new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL || 'file:./prisma/dev.db'
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma