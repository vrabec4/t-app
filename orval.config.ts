import { defineConfig } from 'orval';

export default defineConfig({
  fakestoreapi: {
    input: {
      target: './openapi.json',
    },
    output: {
      mode: 'tags-split',
      target: './src/openapi/generated',
      schemas: './src/openapi/model',
      client: 'react-query',
      override: {
        mutator: {
          path: './src/openapi/api-client.ts',
          name: 'customFetcher',
        },

        useDates: true,
        query: {
          useQuery: true,
          useInfinite: true,
          useInfiniteQueryParam: 'page',
        },
      },
      clean: true,
    },
    hooks: {
      afterAllFilesWrite: 'prettier --write "./src/openapi/**/*.{ts,tsx}"',
    },
  },
});
