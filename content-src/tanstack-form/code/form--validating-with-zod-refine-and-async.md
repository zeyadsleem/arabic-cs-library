# form--validating-with-zod-refine-and-async — Validating with ZOD (Refine and Async)

- الفرع: origin/zod-2
- الأساس: origin/zod-1
- مستودع الدورة: https://github.com/alialaa/tanstack-form-course.git

## ملفات تغيّرت في هذا الدرس

- `src/lib/RegisterForm.tsx` (معدَّل)

### `src/lib/RegisterForm.tsx`

```tsx
import {
  formOptions,
  revalidateLogic,
  useForm,
  useStore,
} from "@tanstack/react-form";
import * as z from "zod";

const formSchema = z
  .object({
    firstName: z
      .string()
      .min(2, "First name should be at least 2 characters.")
      .max(50),
    lastName: z
      .string()
      .min(2, "Last name should be at least 2 characters.")
      .max(50),
    age: z
      .number()
      .min(18, "You must be at least 18 years old.")
      .max(120, "Age must be less than 120.")
      .optional(),
    acceptTerms: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions.",
    }),
    email: z.email("Invalid email address.").optional(),
    password: z.string().min(6, "Password should be at least 6 characters."),
    confirmPassword: z.string(),
    address: z.object({
      street: z.string().min(5, "Street should be at least 5 characters."),
      city: z
        .string()
        .min(2, "City should be at least 2 characters.")
        .optional(),
      state: z
        .string()
        .min(2, "State should be at least 2 characters.")
        .optional(),
      zipCode: z
        .string()
        .min(5, "Zip Code should be at least 5 characters.")
        .optional(),
    }),
    skills: z.array(
      z.object({
        name: z.string(),
        id: z.string(),
        level: z.enum(["beginner", "intermediate", "expert"]),
      })
    ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Passwords do not match",
    path: ["confirmPassword"],
  });
const defaultValues: z.infer<typeof formSchema> = {
  firstName: "",
  lastName: "",
  age: undefined,
  email: "",
  password: "",
  confirmPassword: "",
  address: { street: "", city: "", state: "", zipCode: "" },
  skills: [
    {
      name: "HTML",
      id: crypto.randomUUID(),
      level: "beginner",
    },
    {
      name: "CSS",
      id: crypto.randomUUID(),
      level: "beginner",
    },
    {
      name: "JavaScript",
      id: crypto.randomUUID(),
      level: "beginner",
    },
  ],
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
    validators: {
      onDynamic: formSchema,
    },
    validationLogic: revalidateLogic({
      mode: "submit",
      modeAfterSubmission: "blur",
    }),
    listeners: {
      onChange: ({ formApi, fieldApi }) => {
        console.log(formApi, fieldApi);
      },
    },
  });
  const values = useStore(form.store, (state) => state.values);
  const errors = useStore(form.store, (state) => state.errors);

  return (
    <div className="text-start max-w-[400px] p-4">
      {/* {JSON.stringify(errors)} */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <form.Field
          name="firstName"
          validators={{
            onChangeAsyncDebounceMs: 500,
            onChangeAsync: z.string().refine(
              async (value) => {
                await new Promise((r) => setTimeout(r, 1000));
                return value !== "John";
              },
              {
                error: "First name cannot be John (async check).",
              }
            ),
          }}
          listeners={{
            onChange: ({ value }) => {
              if (!value) {
                form.setFieldValue("lastName", "");
              }
            },
          }}
        >
          {(field) => {
            return (
              <div className="mb-4">
                {/* <pre>{JSON.stringify(field.state.meta, null, 2)}</pre> */}
                <input
                  type="text"
                  placeholder="First Name"
                  className="bg-black text-white border border-white p-2 w-full"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                />
                {!field.state.meta.isValid && (
                  <div className="text-red-500 mt-2" role="alert">
                    {field.state.meta.errors
                      .map((error) => error?.message)
                      .join(", ")}
                  </div>
                )}
              </div>
            );
          }}
        </form.Field>
        <form.Subscribe selector={(state) => state.values.firstName}>
          {(firstName) => (
            <>
              {firstName && (
                <form.Field name="lastName">
                  {(field) => (
                    <div className="mb-4">
                      <input
                        className="bg-black text-white border border-white p-2 w-full"
                        placeholder="Last Name"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      {!field.state.meta.isValid && (
                        <div className="text-red-500 mt-2" role="alert">
                          {field.state.meta.errors
                            .map((error) => error?.message)
                            .join(", ")}
                        </div>
                      )}
                    </div>
                  )}
                </form.Field>
              )}
            </>
          )}
        </form.Subscribe>
        <form.Field name="address.street">
          {(field) => (
            <div className="mb-4">
              <input
                className="bg-black text-white border border-white p-2 w-full"
                placeholder="Street"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {!field.state.meta.isValid && (
                <div className="text-red-500 mt-2" role="alert">
                  {field.state.meta.errors
                    .map((error) => error?.message)
                    .join(", ")}
                </div>
              )}
            </div>
          )}
        </form.Field>
        <form.Field name="password">
          {(field) => (
            <div className="mb-4">
              <input
                className="bg-black text-white border border-white p-2 w-full"
                type="password"
                value={field.state.value}
                placeholder="Password"
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {!field.state.meta.isValid && (
                <div className="text-red-500 mt-2" role="alert">
                  {field.state.meta.errors
                    .map((error) => error?.message)
                    .join(", ")}
                </div>
              )}
            </div>
          )}
        </form.Field>

        <form.Field name="confirmPassword">
          {(field) => (
            <div className="mb-4">
              <input
                className="bg-black text-white border border-white p-2 w-full"
                type="password"
                value={field.state.value}
                placeholder="Confirm Password"
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {!field.state.meta.isValid && (
                <div className="text-red-500 mt-2" role="alert">
                  {field.state.meta.errors
                    .map((error) => error?.message)
                    .join(", ")}
                </div>
              )}
            </div>
          )}
        </form.Field>

        <form.Field name="skills" mode="array">
          {(field) => {
            return (
              <div>
                Skills
                <div>
                  {field.state.value.map((skill, index) => (
                    <div
                      key={skill.id}
                      className="flex items-center mb-2 gap-2"
                    >
                      <span>{skill.name}</span>
                      <form.Field name={`skills[${index}].level`}>
                        {(subField) => (
                          <>
                            <select
                              className="bg-black text-white border border-white p-2 w-full"
                              value={subField.state.value}
                              onBlur={subField.handleBlur}
                              onChange={(e) => {
                                subField.handleChange(e.target.value as any);
                              }}
                            >
                              <option value="beginner">Beginner</option>
                              <option value="intermediate">Intermediate</option>
                              <option value="expert">Expert</option>
                            </select>
                            {!field.state.meta.isValid && (
                              <div className="text-red-500 mt-2" role="alert">
                                {field.state.meta.errors
                                  .map((error) => error?.message)
                                  .join(", ")}
                              </div>
                            )}
                          </>
                        )}
                      </form.Field>
                      <button
                        className="bg-red-700 text-white p-1 ms-2"
                        onClick={() => field.removeValue(index)}
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  className="bg-yellow-700 text-black p-2"
                  onClick={() => {
                    field.pushValue({
                      name: `New Skill ${field.state.value.length + 1}`,
                      id: crypto.randomUUID(),
                      level: "beginner",
                    });
                  }}
                >
                  Add Skill
                </button>
              </div>
            );
          }}
        </form.Field>
        <form.Field name="acceptTerms">
          {(field) => {
            return (
              <div className="mb-4 mt-4">
                <label className="flex items-center gap-2">
                  <input
                    className="bg-black text-white border border-white p-2"
                    type="checkbox"
                    checked={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.checked)}
                  />
                  Accept Terms
                </label>
                {!field.state.meta.isValid && (
                  <div className="text-red-500 mt-2" role="alert">
                    {field.state.meta.errors
                      .map((error) => error?.message)
                      .join(", ")}
                  </div>
                )}
              </div>
            );
          }}
        </form.Field>
        <form.Subscribe selector={(state) => state.canSubmit}>
          {(canSubmit) => (
            <button
              disabled={!canSubmit}
              className="bg-yellow-500 text-black p-2 mt-4 disabled:opacity-40 disabled:cursor-not-allowed"
              type="submit"
            >
              Submit
            </button>
          )}
        </form.Subscribe>
      </form>
      <pre className="mt-10">{JSON.stringify(values, null, 2)}</pre>
    </div>
  );
}
```

## الشيفرة الكاملة عند الفرع `zod-2`

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
