---
title: "أمثلة على SDK الخاص بـ S3"
---

أنماط شائعة للعمل مع Amazon S3 باستخدام AWS SDK لـ JavaScript الإصدار v3 (`@aws-sdk/client-s3`).

## التثبيت

```bash
npm install @aws-sdk/client-s3 @aws-sdk/s3-request-presigner
```

## تهيئة العميل

```typescript
import { S3Client } from '@aws-sdk/client-s3';

const s3 = new S3Client({
  region: 'us-east-1',
  // Credentials are resolved from the environment, shared config,
  // or IAM role by default — only set them explicitly when needed.
});
```

## رفع كائن (`PutObject`)

```typescript
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { readFile } from 'node:fs/promises';

const body = await readFile('./hello.txt');

await s3.send(
  new PutObjectCommand({
    Bucket: 'my-bucket',
    Key: 'hello.txt',
    Body: body,
    ContentType: 'text/plain',
  }),
);
```

## تنزيل كائن (`GetObject`)

```typescript
import { GetObjectCommand } from '@aws-sdk/client-s3';

const { Body } = await s3.send(
  new GetObjectCommand({
    Bucket: 'my-bucket',
    Key: 'hello.txt',
  }),
);

const text = await Body!.transformToString();
console.log(text);
```

## سرد الكائنات (`ListObjectsV2`)

```typescript
import { ListObjectsV2Command } from '@aws-sdk/client-s3';

let ContinuationToken: string | undefined;
do {
  const page = await s3.send(
    new ListObjectsV2Command({
      Bucket: 'my-bucket',
      Prefix: 'uploads/',
      ContinuationToken,
    }),
  );

  for (const obj of page.Contents ?? []) {
    console.log(obj.Key, obj.Size);
  }

  ContinuationToken = page.IsTruncated ? page.NextContinuationToken : undefined;
} while (ContinuationToken);
```

## حذف كائن

```typescript
import { DeleteObjectCommand } from '@aws-sdk/client-s3';

await s3.send(
  new DeleteObjectCommand({
    Bucket: 'my-bucket',
    Key: 'hello.txt',
  }),
);
```

## نسخ كائن

```typescript
import { CopyObjectCommand } from '@aws-sdk/client-s3';

await s3.send(
  new CopyObjectCommand({
    Bucket: 'my-bucket',
    CopySource: 'my-bucket/hello.txt',
    Key: 'archive/hello.txt',
  }),
);
```

## التحقّق من الوجود (`HeadObject`)

```typescript
import { HeadObjectCommand, NotFound } from '@aws-sdk/client-s3';

async function exists(Bucket: string, Key: string) {
  try {
    await s3.send(new HeadObjectCommand({ Bucket, Key }));
    return true;
  } catch (err) {
    if (err instanceof NotFound) return false;
    throw err;
  }
}
```

## عناوين URL الموقّعة مسبقًا

تتيح عناوين URL الموقّعة مسبقًا للعميل رفع كائن أو تنزيله مباشرة من S3 دون أن يمرّر خادمك الخلفي البايتات. ويحمل عنوان URL توقيعًا محدود النطاق وقصير الأجل — فلا يحتاج العميل إلى بيانات اعتماد AWS.

### عنوان URL موقّع مسبقًا للتنزيل (`GetObject`)

```typescript
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const url = await getSignedUrl(
  s3,
  new GetObjectCommand({
    Bucket: 'my-bucket',
    Key: 'reports/q1.pdf',
  }),
  { expiresIn: 60 * 5 }, // 5 minutes
);

// Hand `url` to the browser — plain GET, no auth headers.
```

### عنوان URL موقّع مسبقًا للرفع (`PutObject`)

```typescript
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const url = await getSignedUrl(
  s3,
  new PutObjectCommand({
    Bucket: 'my-bucket',
    Key: `uploads/${crypto.randomUUID()}.png`,
    ContentType: 'image/png',
  }),
  { expiresIn: 60 * 15 },
);
```

على جانب العميل:

```typescript
await fetch(url, {
  method: 'PUT',
  headers: { 'Content-Type': 'image/png' },
  body: file,
});
```

يجب أن تطابق ترويسة `Content-Type` في طلب `PUT` ما وُقّع، وإلا رفض S3 الطلب بـ `SignatureDoesNotMatch`.

## الرفع متعدّد الأجزاء (للملفات الكبيرة)

```typescript
import { Upload } from '@aws-sdk/lib-storage';
import { createReadStream } from 'node:fs';

const upload = new Upload({
  client: s3,
  params: {
    Bucket: 'my-bucket',
    Key: 'videos/large.mp4',
    Body: createReadStream('./large.mp4'),
    ContentType: 'video/mp4',
  },
  queueSize: 4,
  partSize: 5 * 1024 * 1024,
});

upload.on('httpUploadProgress', (p) => {
  console.log(`${p.loaded}/${p.total}`);
});

await upload.done();
```

## مثال Express: الرفع عبر عنوان URL موقّع مسبقًا

تطبيق Express بسيط يمنح العميل عنوان URL موقّعًا مسبقًا للرفع، ثم يقرأ الكائن مرة أخرى لاحقًا.

```typescript
import express from 'express';
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const app = express();
const s3 = new S3Client({ region: 'us-east-1' });
const BUCKET = 'my-bucket';

// Generate a pre-signed URL the client can PUT to directly.
app.post('/uploads', async (req, res) => {
  const key = `uploads/${crypto.randomUUID()}.png`;

  const url = await getSignedUrl(
    s3,
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      ContentType: 'image/png',
    }),
    { expiresIn: 60 * 15 },
  );

  res.json({ url, key });
});

// Proxy a download back through the server (useful when the
// bucket isn't public and you don't want to hand out signed GETs).
app.get('/uploads/:key', async (req, res) => {
  const { Body, ContentType } = await s3.send(
    new GetObjectCommand({
      Bucket: BUCKET,
      Key: `uploads/${req.params.key}`,
    }),
  );

  res.setHeader('Content-Type', ContentType ?? 'application/octet-stream');
  // Body is a Readable stream in Node — pipe it straight through.
  Body!.transformToWebStream().pipeTo(
    new WritableStream({
      write(chunk) {
        res.write(chunk);
      },
      close() {
        res.end();
      },
    }),
  );
});

app.listen(3000);
```

يضرب العميل `POST /uploads` للحصول على عنوان URL موقّع، ويرفع الملف مباشرة إلى S3 بـ `PUT`، ويمكنه لاحقًا جلبه عبر `GET /uploads/:key`. ولا يلمس خادمك بايتات الرفع إطلاقًا — فـ S3 تتولّى العمل الشاق.

## المزالق الشائعة

- **CORS**: عمليات الرفع من المتصفح عبر عنوان URL موقّع مسبقًا تحتاج إلى تهيئة CORS في الحاوية للسماح بـ `PUT` من أصلك.
- **انحراف الساعة**: عناوين URL الموقّعة مسبقًا مرتبطة بالوقت. والعميل الذي انحرفت ساعته بشدة قد يحصل على `RequestTimeTooSkewed`.
- **يجب أن تطابق الترويسات الموقّعة**: أي ترويسة أُدرجت عند التوقيع (مثل `ContentType` و`ACL` و`x-amz-meta-*`) يجب أن يرسلها العميل حرفيًا.
- **المنطقة**: يجب أن تطابق منطقة العميل منطقة الحاوية، وإلا حصلت على `PermanentRedirect` / 301.
