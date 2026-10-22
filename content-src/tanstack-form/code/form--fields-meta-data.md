# form--fields-meta-data — Fields Meta Data

- الفرع: origin/field-meta
- الأساس: origin/first-form
- مستودع الدورة: https://github.com/alialaa/tanstack-form-course.git

## ملفات تغيّرت في هذا الدرس

- `src/lib/RegisterForm.tsx` (معدَّل)

### `src/lib/RegisterForm.tsx`

```tsx
import { formOptions, useForm } from "@tanstack/react-form";

interface RegisterForm {
  firstName: string;
  lastName: string;
  age: number | undefined;
  email: string;
  password: string;
  confirmPassword: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  skills: Array<{
    name: string;
    id: string;
    level: "beginner" | "intermediate" | "expert";
  }>;
  acceptTerms: boolean;
}

const defaultValues: RegisterForm = {
  firstName: "",
  lastName: "",
  age: undefined,
  email: "",
  password: "",
  confirmPassword: "",
  address: { street: "", city: "", state: "", zipCode: "" },
  skills: [],
  acceptTerms: false,
};

const formOpts = formOptions({
  defaultValues,
});

export default function RegisterForm() {
  const form = useForm({
    ...formOpts,
    onSubmit: ({ value }) => {
      console.log(value);
    },
  });
  return (
    <div className="text-start max-w-[400px] p-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <pre>{JSON.stringify(form.state, null, 2)}</pre>
        <form.Field name="firstName">
          {(field) => {
            return (
              <div className="mb-4">
                <pre>{JSON.stringify(field.state.meta, null, 2)}</pre>
                <input
                  type="text"
                  placeholder="First Name"
                  className="bg-black text-white border border-white p-2 w-full"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                />
              </div>
            );
          }}
        </form.Field>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
```

## الشيفرة الكاملة عند الفرع `field-meta`

### `components.json`

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "src/index.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "iconLibrary": "lucide",
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "registries": {}
}
```

### `src/lib/utils.ts`

```ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

### `src/main.tsx`

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { FormDevtoolsPlugin } from "@tanstack/react-form-devtools";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <TanStackDevtools plugins={[FormDevtoolsPlugin()]} />
  </StrictMode>
);
```

### `vite.config.ts`

```ts
import { defineConfig } from 'vite'
import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
```
