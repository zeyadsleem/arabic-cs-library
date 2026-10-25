---
title: "أساسيات الذكاء الاصطناعي بلغة Python"
lang: ar
source: "https://stevekinney.com/courses/python-ai"
---

توفّر هذه الدفاتر (notebooks) نظرةً شاملة على تقنيات معالجة اللغة الطبيعية وتوليد الصور معًا، بالاعتماد أساسًا على مكتبة Hugging Face. يبدأ قسم معالجة اللغة الطبيعية (NLP) بأساسيات استخدام خطوط أنابيب المحوّلات (Transformer Pipelines) في مهام مثل تحليل المشاعر وتوليد النصوص والتلخيص. ثم يغوص في خطوة المعالجة المسبقة الحاسمة، أي الترميز (tokenization)، التي تحوّل النص إلى صيغة رقمية تفهمها النماذج. وبناءً على ذلك، تشرح الدفاتر آلية الانتباه (attention mechanism) التي تتيح للنماذج موازنة أهمية الكلمات المختلفة في الجملة، ومعماريات المفكِّكات (decoder) التي تستخدم الانتباه السببي (causal attention) لتوليد النصوص. وأخيرًا تتوّج مفاهيم معالجة اللغة الطبيعية بدليل عملي لضبط نموذج مُدرَّب مسبقًا على مجموعة بيانات مخصّصة لإنشاء مولّد اقتباسات متخصّص.

يستكشف الجزء الخاص بتوليد الصور في هذه الدفاتر قدرات Stable Diffusion. سنبدأ بتقديم توليد الصور من النصوص، حيث ينشئ النموذج صورًا من أوصاف نصية. ثم تنتقل الدفاتر إلى تحويلات الصور إلى صور (image-to-image transformations)، وهي تقنية تستخدم صورة موجودة كنقطة بداية أو مصدر إلهام لتوليد مشاهد بصرية جديدة. ويُختتم القسم باستكشاف DreamBooth، وهي تقنية تخصيص لضبط نموذج لتوليد الصور من النصوص ببضع صور مرجعية فقط. وهذا يتيح توليد موضوع معيّن في سياقات وأنماط متنوّعة.

# الدفاتر

- [أساسيات خطوط الأنابيب](https://colab.research.google.com/drive/1OnAQGIBrbkbJYC3h-Vf3mUwru9K3usSt?usp=sharing)
- [الترميز](https://colab.research.google.com/drive/15cChgqEWrWTtWApWRBSQBqFpmWDe2ZR7?usp=sharing)
- [آلية الانتباه](https://colab.research.google.com/drive/1m9LFBM2Ncl_k-wMHUYJ-7ltxyhLpM7Br?usp=sharing)
- [المفكِّكات](https://colab.research.google.com/drive/1ZUmRw8pTJaGum1gzJZ4H49X9aWkd9zfW?usp=sharing)
- [الضبط الدقيق](https://colab.research.google.com/drive/1obIENeCQ1NqIe2CK7hgB-s4X0G29T-BV?usp=sharing)
- [توليد الصور](https://colab.research.google.com/drive/15s90EDiGZCFqhkc54bV6lAenLqmevTD3?usp=sharing)
- [تحويلات الصور إلى صور](https://colab.research.google.com/drive/1iI-RKtZOkL4DbaJKCIHIqkati3D1Yv_7?usp=sharing)
- [Dreambooth](https://colab.research.google.com/drive/1Swhhh_rQxRHgD1LGqJgvRigQ8eI5NvsA?usp=sharing)
