// prisma.config.ts
import { defineConfig } from 'prisma/config'

export default defineConfig({
  datasource: {
    url: 'file:./prisma/dev.db', // Ruta al archivo de base de datos
  },
})