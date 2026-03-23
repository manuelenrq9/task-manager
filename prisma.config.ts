import { defineConfig } from '@prisma/config'

export default defineConfig({
  // @ts-ignore - Temporary bypass if types are mismatched between CLI and Client
  engine: {
    type: 'library'
  },
  datasource: {
    url: 'file:./prisma/dev.db',
  },
})