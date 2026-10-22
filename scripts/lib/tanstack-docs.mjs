/** Official documentation links cited by the TanStack lessons.
 *
 * Only links that answered with HTTP 200 are listed as `verified`. A lesson may
 * cite any verified link for its book; the extra, lesson-specific paths are
 * candidates that still need a check before they are published, so the brief
 * generator keeps them out of the brief until they are verified.
 *
 * @typedef {{url: string, title: string, verified: boolean}} DocLink
 */

/** @type {Record<string, DocLink[]>} */
export const DOC_LINKS = {
  router: [
    {
      url: 'https://tanstack.com/router/latest/docs/framework/react/overview',
      title: 'TanStack Router — نظرة عامة (Overview)',
      verified: true,
    },
    {
      url: 'https://tanstack.com/router/latest/docs/framework/react/routing',
      title: 'TanStack Router — التوجيه (Routing)',
      verified: false,
    },
    {
      url: 'https://tanstack.com/router/latest/docs/framework/react/file-based-routing',
      title: 'TanStack Router — التوجيه بالملفات (File-Based Routing)',
      verified: false,
    },
    {
      url: 'https://tanstack.com/router/latest/docs/framework/react/code-based-routing',
      title: 'TanStack Router — التوجيه بالشيفرة (Code-Based Routing)',
      verified: false,
    },
    {
      url: 'https://tanstack.com/router/latest/docs/framework/react/dynamic-path-params',
      title: 'TanStack Router — وسائط المسار الديناميكية (Dynamic Path Params)',
      verified: false,
    },
    {
      url: 'https://tanstack.com/router/latest/docs/framework/react/search-params',
      title: 'TanStack Router — وسائط البحث (Search Params)',
      verified: false,
    },
    {
      url: 'https://tanstack.com/router/latest/docs/framework/react/pending-state',
      title: 'TanStack Router — حالة الانتظار (Pending State)',
      verified: false,
    },
    {
      url: 'https://tanstack.com/router/latest/docs/framework/react/error-handling',
      title: 'TanStack Router — معالجة الأخطاء (Error Handling)',
      verified: false,
    },
    {
      url: 'https://tanstack.com/router/latest/docs/framework/react/preloading',
      title: 'TanStack Router — التحميل المسبق (Preloading)',
      verified: false,
    },
    {
      url: 'https://tanstack.com/router/latest/docs/framework/react/caching',
      title: 'TanStack Router — التخزين المؤقت (Caching)',
      verified: false,
    },
    {
      url: 'https://tanstack.com/router/latest/docs/framework/react/code-splitting',
      title: 'TanStack Router — تقسيم الشيفرة (Code Splitting)',
      verified: false,
    },
  ],
  form: [
    {
      url: 'https://tanstack.com/form/latest/docs/framework/react/overview',
      title: 'TanStack Form — نظرة عامة (Overview)',
      verified: true,
    },
    {
      url: 'https://tanstack.com/form/latest/docs/framework/react/guide/field-validation',
      title: 'TanStack Form — التحقّق من الحقول (Field Validation)',
      verified: false,
    },
    {
      url: 'https://tanstack.com/form/latest/docs/framework/react/guide/form-validation',
      title: 'TanStack Form — التحقّق على مستوى النموذج (Form Validation)',
      verified: false,
    },
    {
      url: 'https://tanstack.com/form/latest/docs/framework/react/guide/async-validation',
      title: 'TanStack Form — التحقّق غير المتزامن (Async Validation)',
      verified: false,
    },
    {
      url: 'https://tanstack.com/form/latest/docs/framework/react/guide/dynamic-validation',
      title: 'TanStack Form — التحقّق الديناميكي (Dynamic Validation)',
      verified: false,
    },
    {
      url: 'https://tanstack.com/form/latest/docs/framework/react/guide/linked-fields',
      title: 'TanStack Form — الحقول المرتبطة (Linked Fields)',
      verified: false,
    },
    {
      url: 'https://tanstack.com/form/latest/docs/framework/react/guide/custom-form-components',
      title: 'TanStack Form — مكوّنات النماذج المخصّصة (Custom Form Components)',
      verified: false,
    },
    {
      url: 'https://tanstack.com/form/latest/docs/framework/react/guide/form-composition',
      title: 'TanStack Form — تركيب النماذج (Form Composition)',
      verified: false,
    },
  ],
};

/** The verified documentation links of one book.
 * @param {'router' | 'form'} section @returns {DocLink[]}
 */
export const verifiedDocLinks = (section) => DOC_LINKS[section].filter((link) => link.verified);
