---
title: "Type-Safe Environment Variables"
lang: en
source: "https://stevekinney.com/courses/react-typescript/typesafe-environment-variables"
---

## Type-Safe Environment Variables

Here’s a pattern for handling environment variables that’ll save you from runtime surprises:

```typescript
// src/lib/env.ts
interface EnvConfig {
  API_BASE_URL: string;
  APP_NAME: string;
  ENABLE_ANALYTICS: boolean;
}

function getEnvVar(key: string, defaultValue?: string): string {
  const value = import.meta.env[`VITE_${key}`] ?? process.env[key];

  if (!value && !defaultValue) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value ?? defaultValue!;
}

export const env: EnvConfig = {
  API_BASE_URL: getEnvVar('API_BASE_URL'),
  APP_NAME: getEnvVar('APP_NAME', 'My App'),
  ENABLE_ANALYTICS: getEnvVar('ENABLE_ANALYTICS', 'false') === 'true',
};
```
