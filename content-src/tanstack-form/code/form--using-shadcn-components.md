# form--using-shadcn-components — Using shadcn Components

- الفرع: origin/shadcn-components
- الأساس: origin/submission
- مستودع الدورة: https://github.com/alialaa/tanstack-form-course.git

## ملفات تغيّرت في هذا الدرس

- `package.json` (معدَّل)
- `src/components/ui/button.tsx` (جديد)
- `src/components/ui/checkbox.tsx` (جديد)
- `src/components/ui/field.tsx` (جديد)
- `src/components/ui/input.tsx` (جديد)
- `src/components/ui/label.tsx` (جديد)
- `src/components/ui/select.tsx` (جديد)
- `src/components/ui/separator.tsx` (جديد)
- `src/lib/RegisterForm.tsx` (معدَّل)

### `package.json`

```json
{
  "name": "tanstack-form-course",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "@radix-ui/react-checkbox": "^1.3.3",
    "@radix-ui/react-label": "^2.1.7",
    "@radix-ui/react-select": "^2.2.6",
    "@radix-ui/react-separator": "^1.1.7",
    "@radix-ui/react-slot": "^1.2.3",
    "@tailwindcss/vite": "^4.1.14",
    "@tanstack/react-devtools": "^0.7.4",
    "@tanstack/react-form": "^1.23.6",
    "@tanstack/react-form-devtools": "^0.1.6",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "lucide-react": "^0.545.0",
    "react": "^19.1.1",
    "react-dom": "^19.1.1",
    "tailwind-merge": "^3.3.1",
    "tailwindcss": "^4.1.14",
    "zod": "^4.1.12"
  },
  "devDependencies": {
    "@eslint/js": "^9.36.0",
    "@tailwindcss/forms": "^0.5.10",
    "@types/node": "^24.7.0",
    "@types/react": "^19.1.16",
    "@types/react-dom": "^19.1.9",
    "@vitejs/plugin-react": "^5.0.4",
    "eslint": "^9.36.0",
    "eslint-plugin-react-hooks": "^5.2.0",
    "eslint-plugin-react-refresh": "^0.4.22",
    "globals": "^16.4.0",
    "tw-animate-css": "^1.4.0",
    "typescript": "~5.9.3",
    "typescript-eslint": "^8.45.0",
    "vite": "^7.1.7"
  }
}
```

### `src/components/ui/button.tsx`

```tsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
```

### `src/components/ui/checkbox.tsx`

```tsx
"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { CheckIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center text-current transition-none"
      >
        <CheckIcon className="size-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
```

### `src/components/ui/field.tsx`

```tsx
import { useMemo } from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

function FieldSet({ className, ...props }: React.ComponentProps<"fieldset">) {
  return (
    <fieldset
      data-slot="field-set"
      className={cn(
        "flex flex-col gap-6",
        "has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3",
        className
      )}
      {...props}
    />
  )
}

function FieldLegend({
  className,
  variant = "legend",
  ...props
}: React.ComponentProps<"legend"> & { variant?: "legend" | "label" }) {
  return (
    <legend
      data-slot="field-legend"
      data-variant={variant}
      className={cn(
        "mb-3 font-medium",
        "data-[variant=legend]:text-base",
        "data-[variant=label]:text-sm",
        className
      )}
      {...props}
    />
  )
}

function FieldGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-group"
      className={cn(
        "group/field-group @container/field-group flex w-full flex-col gap-7 data-[slot=checkbox-group]:gap-3 [&>[data-slot=field-group]]:gap-4",
        className
      )}
      {...props}
    />
  )
}

const fieldVariants = cva(
  "group/field flex w-full gap-3 data-[invalid=true]:text-destructive",
  {
    variants: {
      orientation: {
        vertical: ["flex-col [&>*]:w-full [&>.sr-only]:w-auto"],
        horizontal: [
          "flex-row items-center",
          "[&>[data-slot=field-label]]:flex-auto",
          "has-[>[data-slot=field-content]]:items-start has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",
        ],
        responsive: [
          "flex-col [&>*]:w-full [&>.sr-only]:w-auto @md/field-group:flex-row @md/field-group:items-center @md/field-group:[&>*]:w-auto",
          "@md/field-group:[&>[data-slot=field-label]]:flex-auto",
          "@md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",
        ],
      },
    },
    defaultVariants: {
      orientation: "vertical",
    },
  }
)

function Field({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof fieldVariants>) {
  return (
    <div
      role="group"
      data-slot="field"
      data-orientation={orientation}
      className={cn(fieldVariants({ orientation }), className)}
      {...props}
    />
  )
}

function FieldContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-content"
      className={cn(
        "group/field-content flex flex-1 flex-col gap-1.5 leading-snug",
        className
      )}
      {...props}
    />
  )
}

function FieldLabel({
  className,
  ...props
}: React.ComponentProps<typeof Label>) {
  return (
    <Label
      data-slot="field-label"
      className={cn(
        "group/field-label peer/field-label flex w-fit gap-2 leading-snug group-data-[disabled=true]/field:opacity-50",
        "has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col has-[>[data-slot=field]]:rounded-md has-[>[data-slot=field]]:border [&>*]:data-[slot=field]:p-4",
        "has-data-[state=checked]:bg-primary/5 has-data-[state=checked]:border-primary dark:has-data-[state=checked]:bg-primary/10",
        className
      )}
      {...props}
    />
  )
}

function FieldTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-label"
      className={cn(
        "flex w-fit items-center gap-2 text-sm leading-snug font-medium group-data-[disabled=true]/field:opacity-50",
        className
      )}
      {...props}
    />
  )
}

function FieldDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="field-description"
      className={cn(
        "text-muted-foreground text-sm leading-normal font-normal group-has-[[data-orientation=horizontal]]/field:text-balance",
        "last:mt-0 nth-last-2:-mt-1 [[data-variant=legend]+&]:-mt-1.5",
        "[&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4",
        className
      )}
      {...props}
    />
  )
}

function FieldSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  children?: React.ReactNode
}) {
  return (
    <div
      data-slot="field-separator"
      data-content={!!children}
      className={cn(
        "relative -my-2 h-5 text-sm group-data-[variant=outline]/field-group:-mb-2",
        className
      )}
      {...props}
    >
      <Separator className="absolute inset-0 top-1/2" />
      {children && (
        <span
          className="bg-background text-muted-foreground relative mx-auto block w-fit px-2"
          data-slot="field-separator-content"
        >
          {children}
        </span>
      )}
    </div>
  )
}

function FieldError({
  className,
  children,
  errors,
  ...props
}: React.ComponentProps<"div"> & {
  errors?: Array<{ message?: string } | undefined>
}) {
  const content = useMemo(() => {
    if (children) {
      return children
    }

    if (!errors?.length) {
      return null
    }

    const uniqueErrors = [
      ...new Map(errors.map((error) => [error?.message, error])).values(),
    ]

    if (uniqueErrors?.length == 1) {
      return uniqueErrors[0]?.message
    }

    return (
      <ul className="ml-4 flex list-disc flex-col gap-1">
        {uniqueErrors.map(
          (error, index) =>
            error?.message && <li key={index}>{error.message}</li>
        )}
      </ul>
    )
  }, [children, errors])

  if (!content) {
    return null
  }

  return (
    <div
      role="alert"
      data-slot="field-error"
      className={cn("text-destructive text-sm font-normal", className)}
      {...props}
    >
      {content}
    </div>
  )
}

export {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldContent,
  FieldTitle,
}
```

### `src/components/ui/input.tsx`

```tsx
import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Input }
```

### `src/components/ui/label.tsx`

```tsx
import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"

import { cn } from "@/lib/utils"

function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Label }
```

### `src/components/ui/select.tsx`

```tsx
import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Select({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />
}

function SelectGroup({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />
}

function SelectValue({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />
}

function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  size?: "sm" | "default"
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        "border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className="size-4 opacity-50" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

function SelectContent({
  className,
  children,
  position = "popper",
  align = "center",
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md",
          position === "popper" &&
            "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          className
        )}
        position={position}
        align={align}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            "p-1",
            position === "popper" &&
              "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn("text-muted-foreground px-2 py-1.5 text-xs", className)}
      {...props}
    />
  )
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className
      )}
      {...props}
    >
      <span className="absolute right-2 flex size-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("bg-border pointer-events-none -mx-1 my-1 h-px", className)}
      {...props}
    />
  )
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className
      )}
      {...props}
    >
      <ChevronUpIcon className="size-4" />
    </SelectPrimitive.ScrollUpButton>
  )
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className
      )}
      {...props}
    >
      <ChevronDownIcon className="size-4" />
    </SelectPrimitive.ScrollDownButton>
  )
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}
```

### `src/components/ui/separator.tsx`

```tsx
"use client"

import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "@/lib/utils"

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      )}
      {...props}
    />
  )
}

export { Separator }
```

### `src/lib/RegisterForm.tsx`

```tsx
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  // email: "",
  password: "",
  confirmPassword: "",
  address: { street: "" },
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
    onSubmit: ({ value, meta }) => {
      console.log(value);
      console.log(formSchema.parse(value));
      console.log(meta);
    },
    validators: {
      onDynamic: formSchema,
    },
    validationLogic: revalidateLogic({
      mode: "submit",
      modeAfterSubmission: "blur",
    }),
  });
  const values = useStore(form.store, (state) => state.values);
  const errors = useStore(form.store, (state) => state.errors);

  return (
    <div className="text-start max-w-[400px] p-4">
      {/* {JSON.stringify(errors)} */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit({ key: "value" });
        }}
      >
        <FieldGroup>
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
                <Field>
                  <FieldLabel htmlFor="firstName">First Name</FieldLabel>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="John Doe"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldDescription>Your First Name.</FieldDescription>
                  {!field.state.meta.isValid && (
                    <FieldError>
                      {field.state.meta.errors
                        .map((error) => error?.message)
                        .join(", ")}
                    </FieldError>
                  )}
                </Field>
              );
            }}
          </form.Field>
          <form.Subscribe selector={(state) => state.values.firstName}>
            {(firstName) => (
              <>
                {firstName && (
                  <form.Field name="lastName">
                    {(field) => (
                      <Field>
                        <FieldLabel htmlFor="lastName">Last Name</FieldLabel>
                        <Input
                          id="lastName"
                          type="text"
                          placeholder="Last Name"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                        <FieldDescription>Your last name.</FieldDescription>
                        {!field.state.meta.isValid && (
                          <FieldError>
                            {field.state.meta.errors
                              .map((error) => error?.message)
                              .join(", ")}
                          </FieldError>
                        )}
                      </Field>
                    )}
                  </form.Field>
                )}
              </>
            )}
          </form.Subscribe>
          <form.Field name="address.street">
            {(field) => (
              <Field>
                <FieldLabel htmlFor="address.street">Street</FieldLabel>
                <Input
                  id="address.street"
                  type="text"
                  placeholder="Street"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <FieldDescription>Your street address.</FieldDescription>
                {!field.state.meta.isValid && (
                  <FieldError>
                    {field.state.meta.errors
                      .map((error) => error?.message)
                      .join(", ")}
                  </FieldError>
                )}
              </Field>
            )}
          </form.Field>
          <form.Field name="password">
            {(field) => (
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <FieldDescription>
                  Your password (must be at least 8 characters long).
                </FieldDescription>
                {!field.state.meta.isValid && (
                  <FieldError>
                    {field.state.meta.errors
                      .map((error) => error?.message)
                      .join(", ")}
                  </FieldError>
                )}
              </Field>
            )}
          </form.Field>

          <form.Field name="confirmPassword">
            {(field) => (
              <Field>
                <FieldLabel htmlFor="confirmPassword">
                  Confirm Password
                </FieldLabel>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <FieldDescription>Confirm your password.</FieldDescription>
                {!field.state.meta.isValid && (
                  <FieldError>
                    {field.state.meta.errors
                      .map((error) => error?.message)
                      .join(", ")}
                  </FieldError>
                )}
              </Field>
            )}
          </form.Field>

          <form.Field name="skills" mode="array">
            {(field) => {
              return (
                <FieldSet>
                  <FieldLegend>Skills</FieldLegend>
                  <FieldDescription>
                    Your skills and expertise.
                  </FieldDescription>
                  <FieldGroup>
                    {field.state.value.map((skill, index) => {
                      return (
                        <div key={skill.id}>
                          <form.Field
                            key={index}
                            name={`skills[${index}].level`}
                          >
                            {(subField) => {
                              return (
                                <Field>
                                  <div className="flex  gap-2 ">
                                    <FieldLabel>{skill.name}</FieldLabel>
                                    <Select
                                      value={subField.state.value}
                                      onValueChange={(value) =>
                                        subField.handleChange(value as any)
                                      }
                                    >
                                      <SelectTrigger
                                        onBlur={subField.handleBlur}
                                      >
                                        <SelectValue placeholder="Choose department" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="beginner">
                                          Beginner
                                        </SelectItem>
                                        <SelectItem value="intermediate">
                                          Intermediate
                                        </SelectItem>
                                        <SelectItem value="expert">
                                          Expert
                                        </SelectItem>
                                      </SelectContent>
                                    </Select>

                                    <Button
                                      variant="destructive"
                                      type="button"
                                      onClick={() => field.removeValue(index)}
                                    >
                                      Remove
                                    </Button>
                                  </div>

                                  {!field.state.meta.isValid && (
                                    <FieldError>
                                      {field.state.meta.errors
                                        .map((error) => error?.message)
                                        .join(", ")}
                                    </FieldError>
                                  )}
                                </Field>
                              );
                            }}
                          </form.Field>
                        </div>
                      );
                    })}
                    <Button
                      onClick={() =>
                        field.pushValue({
                          name: `New Skill ${field.state.value.length + 1}`,
                          id: crypto.randomUUID(),
                          level: "beginner",
                        })
                      }
                      variant="secondary"
                      type="button"
                    >
                      Add Skill
                    </Button>
                  </FieldGroup>
                </FieldSet>
              );
            }}
          </form.Field>
          <form.Field name="acceptTerms">
            {(field) => {
              return (
                <Field>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={field.state.value}
                      onCheckedChange={(checked) =>
                        field.handleChange(checked === true)
                      }
                      onBlur={field.handleBlur}
                    />
                    <FieldContent>
                      <FieldLabel htmlFor="finder-pref-9k2-sync-folders-nep">
                        Accept Terms
                      </FieldLabel>
                    </FieldContent>
                  </div>
                  {!field.state.meta.isValid && (
                    <FieldError>
                      {field.state.meta.errors
                        .map((error) => error?.message)
                        .join(", ")}
                    </FieldError>
                  )}
                </Field>
              );
            }}
          </form.Field>
          <form.Subscribe selector={(state) => state.canSubmit}>
            {(canSubmit) => (
              <div>
                <Button
                  disabled={!canSubmit}
                  type="submit"
                  onClick={() => form.handleSubmit({ submitAction: "save" })}
                >
                  Save
                </Button>
                <Button
                  disabled={!canSubmit}
                  type="submit"
                  onClick={() => form.handleSubmit({ submitAction: "goback" })}
                >
                  Save & Go back
                </Button>
              </div>
            )}
          </form.Subscribe>
        </FieldGroup>
      </form>
      <pre className="mt-10">{JSON.stringify(values, null, 2)}</pre>
    </div>
  );
}
```

## الشيفرة الكاملة عند الفرع `shadcn-components`

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
