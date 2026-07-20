import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

const normalizeBase = (value: string) => {
  const trimmed = value.trim()

  if (!trimmed || trimmed === '/') {
    return '/'
  }

  return `/${trimmed.replace(/^\/+|\/+$/g, '')}/`
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const repoName = env.GITHUB_REPOSITORY?.split('/')[1]
  const configuredBase = env.VITE_BASE_PATH

  return {
    base: configuredBase
      ? normalizeBase(configuredBase)
      : mode === 'production' && repoName
        ? `/${repoName}/`
        : '/',
    plugins: [react()],
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: './src/test/setup.ts',
      css: true,
      coverage: {
        reporter: ['text', 'html'],
      },
    },
  }
})
