---
title: "ComponentType, HOCs, and Render Props"
lang: en
source: "https://stevekinney.com/courses/react-typescript/componenttype-hocs-render-props"
---

> **Content Reorganized**
>
> This content has been split into specialized guides for better focus and clarity.

## For Higher-Order Components

**See: [Higher Order Components Typing](https://stevekinney.com/courses/react-typescript/higher-order-components-typing)**

Covers:

- Complete HOC typing patterns
- ComponentType usage in HOCs
- Prop injection and omitting
- Common HOC patterns and utilities

## For Render Props Patterns

**See: [Render Props and HOC Alternatives](https://stevekinney.com/courses/react-typescript/render-props-and-hoc-alternatives)**

Covers:

- Render prop patterns with TypeScript
- Children as functions
- Modern alternatives to HOCs
- Custom hooks vs render props

## Understanding ComponentType

`ComponentType` is a React TypeScript utility that represents any valid React component:

```typescript
type ComponentType<P = {}> = ComponentClass<P> | FunctionComponent<P>;
```

It’s the foundation for:

- Writing functions that accept any component type
- Building HOCs that work with function and class components
- Creating polymorphic component patterns
- Type-safe component composition

Both guides above extensively use `ComponentType` in their examples and patterns.
