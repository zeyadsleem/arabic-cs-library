---
title: "حلول تمارين مقاطع الشيفرة في Visual Studio Code"
lang: ar
source: "https://stevekinney.com/courses/visual-studio-code/vscode-snippets-solutions"
---

في ما يلي بعض الحلول الممكنة [لهذه التمارين حول إنشاء المقاطع في Visual Studio Code](https://stevekinney.com/courses/visual-studio-code/vscode-snippet-exercises).

## دالة أساسية

```json
{
  "Basic Function": {
    "prefix": "func",
    "body": ["function ${1:functionName}(${2:parameters}): ${3:returnType} {", "\t${4}", "}"],
    "description": "Basic function declaration"
  }
}
```

## دالة سهمية

```json
{
  "Arrow Function": {
    "prefix": "arrfunc",
    "body": ["const ${1:variableName} = (${2:parameters}): ${3:returnType} => {", "\t${4}", "};"],
    "description": "Basic arrow function declaration"
  }
}
```

## دالة غير متزامنة

```json
{
  "Async Function": {
    "prefix": "asyncfunc",
    "body": [
      "async function ${1:functionName}(${2:parameters}): Promise<${3:returnType}> {",
      "\t${4}",
      "}"
    ],
    "description": "Asynchronous function declaration"
  }
}
```

## صنف أساسي

```json
{
  "Basic Class": {
    "prefix": "class",
    "body": ["class ${1:ClassName} {", "\tconstructor(${2:parameters}) {", "\t\t${3}", "\t}", "}"],
    "description": "Basic class declaration"
  }
}
```

## تابع الصنف

```json
{
  "Class Method": {
    "prefix": "classmethod",
    "body": ["public ${1:methodName}(${2:parameters}): ${3:returnType} {", "\t${4}", "}"],
    "description": "Public method within a class"
  }
}
```

## خاصية خاصة

```json
{
  "Private Property": {
    "prefix": "privateprop",
    "body": ["private ${1:propertyName}: ${2:propertyType};"],
    "description": "Private property declaration in a class"
  }
}
```

## استيراد أساسي

```json
{
  "Basic Import": {
    "prefix": "import",
    "body": ["import { ${1:module} } from '${2:path}';"],
    "description": "Basic import statement"
  }
}
```

## استيراد الكل

```json
{
  "Import All": {
    "prefix": "importall",
    "body": ["import * as ${1:alias} from '${2:path}';"],
    "description": "Import all modules with an alias"
  }
}
```

## اسم نوع بديل

```json
{
  "Type Alias": {
    "prefix": "typealias",
    "body": ["type ${1:TypeName} = ${2:Type};"],
    "description": "Type alias declaration"
  }
}
```

## Promise

```json
{
  "Promise": {
    "prefix": "promise",
    "body": ["new Promise<${1:Type}>((resolve, reject) => {", "\t${2}", "});"],
    "description": "Basic Promise structure"
  }
}
```

## طلب `Workspace` أساسي

```json
{
  "Basic fetch Request": {
    "prefix": "ffetch",
    "body": [
      "try {",
      "\tconst response = await fetch('${1:url}', {",
      "\t\tmethod: '${2|POST,PUT,PATCH,DELETE,GET|}',",
      "\t\tbody: ${3:JSON.stringify(data)}",
      "\t});",
      "\tconst data = await response.json();",
      "\tconsole.log(data);",
      "} catch (error) {",
      "\tconsole.error('Error fetching data:', error);",
      "}"
    ],
    "description": "Basic fetch request with error handling"
  }
}
```

## استيراد التصدير الافتراضي

```json
{
  "Import Default Export": {
    "prefix": "importdef",
    "body": ["import ${1:defaultExport} from '${2:modulePath}';"],
    "description": "Import default export"
  }
}
```

## مسار Express أساسي

```json
{
  "Basic Express Route": {
    "prefix": "expressroute",
    "body": [
      "app.${1|get,post,put,patch,delete|}('${2:path}', (req: Request, res: Response, next: NextFunction) => {",
      "\t${3}",
      "\tres.send('${4:Hello World!}');",
      "});"
    ],
    "description": "Basic Express route handler"
  }
}
```

## مكوّن React أساسي

```json
{
  "Basic React Component": {
    "prefix": "rc",
    "body": [
      "import React from 'react';",
      "",
      "interface ${1:Props} {}",
      "",
      "const ${2:ComponentName}: React.FC<${1:Props}> = ({}) => {",
      "\treturn (",
      "\t\t<div>",
      "\t\t\t${3}",
      "\t\t</div>",
      "\t);",
      "};",
      "",
      "export default ${2:ComponentName};"
    ],
    "description": "Basic functional React component"
  }
}
```

## مقطع ترويسة الملف

```json
{
  "File Header Snippet": {
    "prefix": "fileheader",
    "body": [
      "/**",
      " * File: $TM_FILENAME",
      " * Date: $CURRENT_YEAR-$CURRENT_MONTH-$CURRENT_DATE",
      " */"
    ],
    "description": "Standard file header comment"
  }
}
```

## التحويل إلى أحرف كبيرة

```json
{
  "Transform to Uppercase": {
    "prefix": "toupper",
    "body": [
      "const originalWord = \"${1:word}\";",
      "const upperCaseWord = \"${1/(.*)/${1:/upcase}/}\";"
    ],
    "description": "Transform placeholder text to uppercase"
  }
}
```

## الإحاطة بـ `try…catch`

```json
{
  "Surround with try/catch": {
    "prefix": "trycatch",
    "body": ["try {", "\t$TM_SELECTED_TEXT", "} catch (error) {", "\tconsole.error(error);", "}"],
    "description": "Wrap selected code with try/catch"
  }
}
```
