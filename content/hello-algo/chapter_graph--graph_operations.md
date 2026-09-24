---
title: "العمليات الأساسية على الرسوم البيانية"
book: hello-algo
chapter: chapter_graph
slug: graph_operations
order: 58
lang: ar
---
يمكن تقسيم العمليات الأساسية على الرسوم البيانية إلى عمليات على «الأضلاع» وعمليات على «الرؤوس». وتختلف تطبيقاتها حسب ما إذا كان الرسم البياني ممثّلاً بـ«مصفوفة تجاور» أو «قائمة تجاور».

## التنفيذ باستخدام مصفوفة التجاور

بمعطى رسم بياني غير موجّه فيه $n$ من الرؤوس، تُنفَّذ العمليات المختلفة كما يوضح الشكل أدناه.

- **إضافة ضلع أو حذفه**: عدّل الضلع المحدد مباشرةً في مصفوفة التجاور، بزمن $O(1)$. وبما أن الرسم البياني غير موجّه، يلزم تحديث اتجاهي الضلع معاً.
- **إضافة رأس**: أضف صفاً وعموداً في نهاية مصفوفة التجاور واملأهما جميعاً بالقيمة $0$، بزمن $O(n)$.
- **حذف رأس**: احذف صفاً وعموداً في مصفوفة التجاور. وتحدث أسوأ حالة عند حذف الصف والعمود الأولين، حيث يلزم «نقل $(n-1)^2$ عنصراً إلى الأعلى واليسار»، وبذلك يكون الزمن $O(n^2)$.
- **التهيئة**: بمعطى $n$ من الرؤوس، هيّئ قائمة رؤوس `vertices` طولها $n$، بزمن $O(n)$؛ وهيّئ مصفوفة تجاور `adjMat` حجمها $n \times n$، بزمن $O(n^2)$.

وفيما يلي شيفرة تنفيذ الرسوم البيانية الممثلة بمصفوفة التجاور:

<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>

```ts
/* فئة الرسم البياني غير الموجّه القائمة على مصفوفة التجاور */
class GraphAdjMat {
    vertices: number[]; // قائمة الرؤوس، حيث يمثل العنصر "قيمة الرأس" ويمثل الفهرس "فهرس الرأس"
    adjMat: number[][]; // مصفوفة التجاور، حيث يقابل فهرسا الصف والعمود "فهرس الرأس"

    /* المُنشئ */
    constructor(vertices: number[], edges: number[][]) {
        this.vertices = [];
        this.adjMat = [];
        // إضافة الرؤوس
        for (const val of vertices) {
            this.addVertex(val);
        }
        // إضافة الأضلاع
        // لاحظ أن عناصر edges تمثل فهارس الرؤوس، أي أنها تقابل فهارس عناصر vertices
        for (const e of edges) {
            this.addEdge(e[0], e[1]);
        }
    }

    /* الحصول على عدد الرؤوس */
    size(): number {
        return this.vertices.length;
    }

    /* إضافة رأس */
    addVertex(val: number): void {
        const n: number = this.size();
        // إضافة قيمة الرأس الجديد إلى قائمة الرؤوس
        this.vertices.push(val);
        // إضافة صف إلى مصفوفة التجاور
        const newRow: number[] = [];
        for (let j: number = 0; j < n; j++) {
            newRow.push(0);
        }
        this.adjMat.push(newRow);
        // إضافة عمود إلى مصفوفة التجاور
        for (const row of this.adjMat) {
            row.push(0);
        }
    }

    /* حذف رأس */
    removeVertex(index: number): void {
        if (index >= this.size()) {
            throw new RangeError('Index Out Of Bounds Exception');
        }
        // حذف الرأس عند الفهرس index من قائمة الرؤوس
        this.vertices.splice(index, 1);

        // حذف الصف عند الفهرس index من مصفوفة التجاور
        this.adjMat.splice(index, 1);
        // حذف العمود عند الفهرس index من مصفوفة التجاور
        for (const row of this.adjMat) {
            row.splice(index, 1);
        }
    }

    /* إضافة ضلع */
    // المعاملان i وj يقابلان فهارس عناصر vertices
    addEdge(i: number, j: number): void {
        // معالجة تجاوز حدود الفهارس والتساوي
        if (i < 0 || j < 0 || i >= this.size() || j >= this.size() || i === j) {
            throw new RangeError('Index Out Of Bounds Exception');
        }
        // في الرسم البياني غير الموجّه، مصفوفة التجاور متماثلة حول القطر الرئيسي، أي أنها تحقق (i, j) === (j, i)
        this.adjMat[i][j] = 1;
        this.adjMat[j][i] = 1;
    }

    /* حذف ضلع */
    // المعاملان i وj يقابلان فهارس عناصر vertices
    removeEdge(i: number, j: number): void {
        // معالجة تجاوز حدود الفهارس والتساوي
        if (i < 0 || j < 0 || i >= this.size() || j >= this.size() || i === j) {
            throw new RangeError('Index Out Of Bounds Exception');
        }
        this.adjMat[i][j] = 0;
        this.adjMat[j][i] = 0;
    }

    /* طباعة مصفوفة التجاور */
    print(): void {
        console.log('Vertex list = ', this.vertices);
        console.log('Adjacency matrix =', this.adjMat);
    }
}
```

</div>

## التنفيذ باستخدام قائمة التجاور

بمعطى رسم بياني غير موجّه فيه $n$ من الرؤوس إجمالاً و$m$ من الأضلاع، يمكن تنفيذ العمليات المختلفة كما يوضح الشكل أدناه.

- **إضافة ضلع**: أضف الضلع في نهاية القائمة المترابطة للرأس المقابل، بزمن $O(1)$. وبما أن الرسم البياني غير موجّه، يلزم إضافة الضلعين في الاتجاهين معاً.
- **حذف ضلع**: ابحث عن الضلع المحدد في القائمة المترابطة للرأس المقابل واحذفه، بزمن $O(m)$. وفي الرسم البياني غير الموجّه، يلزم حذف الضلعين في الاتجاهين معاً.
- **إضافة رأس**: أضف قائمة مترابطة إلى قائمة التجاور، ويكون الرأس الجديد هو العقدة الرأسية، بزمن $O(1)$.
- **حذف رأس**: اجتز قائمة التجاور كاملة واحذف جميع الأضلاع التي تحتوي على الرأس المحدد، بزمن $O(n + m)$.
- **التهيئة**: أنشئ $n$ من الرؤوس و$2m$ من الأضلاع في قائمة التجاور، بزمن $O(n + m)$.

تعرض الشيفرة التالية تنفيذ قائمة التجاور. وبالمقارنة بالشكل أعلاه، تختلف الشيفرة الفعلية في النقاط التالية.

- لتسهيل إضافة الرؤوس وحذفها ولتبسيط الشيفرة، نستخدم قوائم (مصفوفات ديناميكية) بدلاً من القوائم المترابطة.
- يُستخدم جدول تجزئة لتخزين قائمة التجاور، حيث يكون `key` نسخة الرأس و`value` قائمة (القائمة المترابطة) الرؤوس المجاورة لذلك الرأس.

وإضافة إلى ذلك، نستخدم الفئة `Vertex` لتمثيل الرؤوس في قائمة التجاور للسبب التالي: لو استخدمنا فهارس القائمة للتمييز بين الرؤوس المختلفة، كما في مصفوفات التجاور، لاحتجنا عند حذف الرأس عند الفهرس $i$ إلى اجتياز قائمة التجاور كاملة وإنقاص جميع الفهارس الأكبر من $i$ بمقدار $1$، وهو أمر شديد الانخفاض في الكفاءة. أما إذا كان كل رأس نسخة `Vertex` فريدة، فلن يتطلب حذف رأس واحد تعديل الرؤوس الأخرى.

<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>

```ts
/* فئة الرسم البياني غير الموجّه القائمة على قائمة التجاور */
class GraphAdjList {
    // قائمة التجاور، key: الرأس، value: جميع الرؤوس المجاورة لذلك الرأس
    adjList: Map<Vertex, Vertex[]>;

    /* المُنشئ */
    constructor(edges: Vertex[][]) {
        this.adjList = new Map();
        // إضافة جميع الرؤوس والأضلاع
        for (const edge of edges) {
            this.addVertex(edge[0]);
            this.addVertex(edge[1]);
            this.addEdge(edge[0], edge[1]);
        }
    }

    /* الحصول على عدد الرؤوس */
    size(): number {
        return this.adjList.size;
    }

    /* إضافة ضلع */
    addEdge(vet1: Vertex, vet2: Vertex): void {
        if (
            !this.adjList.has(vet1) ||
            !this.adjList.has(vet2) ||
            vet1 === vet2
        ) {
            throw new Error('Illegal Argument Exception');
        }
        // إضافة الضلع vet1 - vet2
        this.adjList.get(vet1).push(vet2);
        this.adjList.get(vet2).push(vet1);
    }

    /* حذف ضلع */
    removeEdge(vet1: Vertex, vet2: Vertex): void {
        if (
            !this.adjList.has(vet1) ||
            !this.adjList.has(vet2) ||
            vet1 === vet2 ||
            this.adjList.get(vet1).indexOf(vet2) === -1
        ) {
            throw new Error('Illegal Argument Exception');
        }
        // حذف الضلع vet1 - vet2
        this.adjList.get(vet1).splice(this.adjList.get(vet1).indexOf(vet2), 1);
        this.adjList.get(vet2).splice(this.adjList.get(vet2).indexOf(vet1), 1);
    }

    /* إضافة رأس */
    addVertex(vet: Vertex): void {
        if (this.adjList.has(vet)) return;
        // إضافة قائمة مترابطة جديدة في قائمة التجاور
        this.adjList.set(vet, []);
    }

    /* حذف رأس */
    removeVertex(vet: Vertex): void {
        if (!this.adjList.has(vet)) {
            throw new Error('Illegal Argument Exception');
        }
        // حذف القائمة المترابطة المقابلة للرأس vet في قائمة التجاور
        this.adjList.delete(vet);
        // اجتياز القوائم المترابطة للرؤوس الأخرى وحذف جميع الأضلاع التي تحتوي على vet
        for (const set of this.adjList.values()) {
            const index: number = set.indexOf(vet);
            if (index > -1) {
                set.splice(index, 1);
            }
        }
    }

    /* طباعة قائمة التجاور */
    print(): void {
        console.log('Adjacency list =');
        for (const [key, value] of this.adjList.entries()) {
            const tmp = [];
            for (const vertex of value) {
                tmp.push(vertex.val);
            }
            console.log(key.val + ': ' + tmp.join());
        }
    }
}
```

</div>

## مقارنة الكفاءة

بافتراض أن الرسم البياني فيه $n$ من الرؤوس و$m$ من الأضلاع، يقارن الجدول أدناه الكفاءة الزمنية والكفاءة المكانية لمصفوفات التجاور وقوائم التجاور. لاحظ أن قائمة التجاور (القائمة المترابطة) تقابل التنفيذ المستخدم في هذا القسم، بينما تشير قائمة التجاور (جدول التجزئة) تحديداً إلى التنفيذ الذي تُستبدل فيه جميع القوائم المترابطة بجداول تجزئة.

<p align="center"> جدول <id> &nbsp; مقارنة بين مصفوفة التجاور وقائمة التجاور </p>

|                        | مصفوفة التجاور | قائمة التجاور (قائمة مترابطة) | قائمة التجاور (جدول تجزئة) |
| ---------------------- | ---------------- | ---------------------------- | --------------------------- |
| تحديد التجاور    | $O(1)$           | $O(n)$                       | $O(1)$                      |
| إضافة ضلع            | $O(1)$           | $O(1)$                       | $O(1)$                      |
| حذف ضلع         | $O(1)$           | $O(n)$                       | $O(1)$                      |
| إضافة رأس           | $O(n)$           | $O(1)$                       | $O(1)$                      |
| حذف رأس        | $O(n^2)$         | $O(n + m)$                   | $O(n)$                      |
| استهلاك مساحة الذاكرة     | $O(n^2)$         | $O(n + m)$                   | $O(n + m)$                  |

وبمراقبة الجدول أعلاه، يبدو أن قائمة التجاور (جدول التجزئة) هي الأفضل في الكفاءة الزمنية والكفاءة المكانية. غير أن العمل على الأضلاع في مصفوفة التجاور أكثر كفاءة في الممارسة العملية، إذ لا يتطلب سوى عملية وصول واحدة إلى المصفوفة أو إسناد واحد. وإجمالاً، تجسّد مصفوفات التجاور مبدأ «المقايضة بين المساحة والزمن»، بينما تجسّد قوائم التجاور «المقايضة بين الزمن والمساحة».
