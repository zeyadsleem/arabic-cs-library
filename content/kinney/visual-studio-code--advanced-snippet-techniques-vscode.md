---
title: "تقنيات متقدّمة في المقتطفات"
lang: ar
source: "https://stevekinney.com/courses/visual-studio-code/advanced-snippet-techniques-vscode"
---

حسنًا، لم ننتهِ بعد. فلنأخذ لحظة سريعة لننظر في استراتيجيتين متقدّمتين قبل أن نمضي.

- استخدام المقتطفات المتداخلة
- استخدام التعبيرات النمطية في المقتطفات

## المقتطفات المتداخلة

تتيح لك المقتطفات المتداخلة إنشاء مسارات عمل معقّدة لتوليد الشيفرة بإدراج مقتطفات داخل مقتطفات أخرى. ويتحقّق ذلك باستخدام عناصر نائبة كمُشغّلات للمقتطفات.

### مثال: مقتطف مكوّن React متداخل

افترض أن لديك مقتطفًا أساسيًا لمكوّن React ومقتطفًا منفصلًا لـ PropTypes. ويمكنك تداخل مقتطف PropTypes داخل مقتطف المكوّن.

```json
"React Functional Component": {
    "prefix": "rfc",
    "body": [
        "import React from 'react';",
        "",
        "const ${1:${TM_FILENAME_BASE/^(.*)$/${1:/pascalcase}/}} = (props) => {",
        "\treturn (",
        "\t\t<div>",
        "\t\t\t${0}",
        "\t\t</div>",
        "\t);",
        "};",
        "",
        "export default ${1};"
    ],
    "description": "React functional component"
}
```

### مقتطف PropTypes

```json
"React PropTypes": {
    "prefix": "proptypes",
    "body": [
        "import PropTypes from 'prop-types';",
        "",
        "${1:ComponentName}.propTypes = {",
        "\t${0}",
        "};"
    ],
    "description": "React PropTypes definition"
}
```

**تداخلهما:** للتداخل، عدّل مقتطف مكوّن React (`react-component.json`) ليتضمّن عنصرًا نائبًا يشغّل مقتطف PropTypes. واستبدل السطر `export default ${1};` بما يلي:

```json
'export default ${1};', '${2:proptypes}'; // Placeholder that triggers "proptypes" snippet
```

الآن يصبح المقتطف المعدّل:

```json
"React Functional Component with PropTypes": { // Renamed snippet
    "prefix": "rfcp", // New prefix
    "body": [
        "import React from 'react';",
        "",
        "const ${1:${TM_FILENAME_BASE/^(.*)$/${1:/pascalcase}/}} = (props) => {",
        "\treturn (",
        "\t\t<div>",
        "\t\t\t${0}",
        "\t\t</div>",
        "\t);",
        "};",
        "",
        "export default ${1};",
        "${2:proptypes}" // Placeholder that triggers "proptypes" snippet
    ],
    "description": "React functional component with PropTypes" // Updated description
}
```

### كيف يعمل هذا

1. أدرج مقتطف “React Functional Component with PropTypes” باستخدام البادئة `rfcp`.
2. املأ اسم المكوّن في العنصر النائب `$1`.
3. اضغط `Tab` للانتقال إلى العنصر النائب `$2`.
4. الآن، داخل العنصر النائب `$2`، اكتب بادئة مقتطف “React PropTypes”، وهي `proptypes`.
5. سيقترح Visual Studio Code مقتطف “React PropTypes”. فاختره.
6. سيُدرج مقتطف “React PropTypes” *داخل* العنصر النائب `$2` من مقتطف “React Functional Component”، فيتداخل المقتطفان فعليًا.

تتيح لك المقتطفات المتداخلة إنشاء قوالب شيفرة معيارية قابلة لإعادة الاستخدام، وبناء بنى معقّدة من مقتطفات أصغر يمكن إدارتها.
