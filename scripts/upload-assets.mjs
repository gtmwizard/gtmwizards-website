// Sync /public/assets to the R2 bucket. Runs on your machine with your R2
// keys (never in the deployed site), same principle as hubsell's
// migrate-assets script. Usage:
//   cp .env.example .env  (fill R2_* values)
//   node scripts/upload-assets.mjs [--dry-run]
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import mime from 'mime-types';

const dry = process.argv.includes('--dry-run');
const {
  R2_ACCOUNT_ID,
  R2_ACCESS_KEY_ID,
  R2_SECRET_ACCESS_KEY,
  R2_BUCKET,
} = process.env;

if (!dry && (!R2_ACCOUNT_ID || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY || !R2_BUCKET)) {
  console.error('Missing R2_* env vars. Copy .env.example to .env and fill them.');
  process.exit(1);
}

const ROOT = new URL('../public/assets', import.meta.url).pathname;

function* walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) yield* walk(full);
    else yield full;
  }
}

const client = dry
  ? null
  : new S3Client({
      region: 'auto',
      endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: R2_ACCESS_KEY_ID,
        secretAccessKey: R2_SECRET_ACCESS_KEY,
      },
    });

for (const file of walk(ROOT)) {
  const key = `assets/${relative(ROOT, file)}`;
  const type = mime.lookup(file) || 'application/octet-stream';
  console.log(`${dry ? '[dry] ' : ''}${key} (${type})`);
  if (!dry) {
    await client.send(
      new PutObjectCommand({
        Bucket: R2_BUCKET,
        Key: key,
        Body: readFileSync(file),
        ContentType: type,
        CacheControl: 'public, max-age=31536000, immutable',
      })
    );
  }
}
console.log('Done.');
