/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *  GuruVani — Export Static Shloka Data to JSON
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *
 *  This script reads the STATIC_SHLOKA_CATEGORIES_DATA from
 *  the TypeScript source and exports it as a clean JSON snapshot
 *  that uploadShlokas.js uses to push data to Firestore.
 *
 *  Usage:
 *    node scripts/exportShlokaData.js
 *
 *  Output:
 *    scripts/shlokaData.json
 *
 *  Notes:
 *  - `image` fields (local require paths) are stripped automatically
 *    since Firestore only stores URLs, not binary assets.
 *  - This requires ts-node or a compiled version of shlokaService.ts
 */

const fs = require('fs');
const path = require('path');

// ─── Path to the compiled TS source ─────────────────────────────────────────
// Option A: If you have ts-node installed, we can run it directly.
// Option B: We inline the data transformation below (safer for CI/CD).

const OUTPUT_PATH = path.join(__dirname, 'shlokaData.json');

// ─── Strip non-serializable fields ──────────────────────────────────────────
function cleanForFirestore(obj) {
  if (Array.isArray(obj)) {
    return obj.map(cleanForFirestore);
  }
  if (obj !== null && typeof obj === 'object') {
    const clean = {};
    for (const [key, value] of Object.entries(obj)) {
      // Skip local image requires (they are functions/modules, not serializable)
      if (key === 'image') continue;
      // Skip undefined values
      if (value === undefined) continue;
      clean[key] = cleanForFirestore(value);
    }
    return clean;
  }
  return obj;
}

// ─── Try to load the data via ts-node ───────────────────────────────────────
async function main() {
  console.log('📂 Exporting shloka static data to JSON...\n');

  let rawData;

  try {
    // Requires ts-node: npm install -g ts-node
    // Also requires tsconfig.json to be valid
    const tsNodePath = path.join(
      __dirname,
      '../node_modules/.bin/ts-node'
    );

    if (fs.existsSync(tsNodePath)) {
      const { execSync } = require('child_process');
      const tmpScript = path.join(__dirname, '_tmp_export.ts');

      fs.writeFileSync(tmpScript, `
import { STATIC_SHLOKA_CATEGORIES_DATA } from '../src/services/firebaseServices/shlokaService';
import * as fs from 'fs';

// Remove image fields (not serializable to JSON)
function clean(obj: any): any {
  if (Array.isArray(obj)) return obj.map(clean);
  if (obj && typeof obj === 'object') {
    const out: any = {};
    for (const [k, v] of Object.entries(obj)) {
      if (k === 'image') continue;
      if (v === undefined) continue;
      out[k] = clean(v);
    }
    return out;
  }
  return obj;
}

const cleaned = clean(STATIC_SHLOKA_CATEGORIES_DATA);
fs.writeFileSync('${OUTPUT_PATH}', JSON.stringify(cleaned, null, 2));
console.log('✅ Exported', Object.keys(cleaned).length, 'categories');
`);

      execSync(`${tsNodePath} --project tsconfig.json ${tmpScript}`, {
        cwd: path.join(__dirname, '..'),
        stdio: 'inherit',
      });

      fs.unlinkSync(tmpScript);

      rawData = JSON.parse(fs.readFileSync(OUTPUT_PATH, 'utf-8'));
    } else {
      throw new Error('ts-node not found');
    }
  } catch (err) {
    console.warn(`⚠️  ts-node not available or failed: ${err.message}`);
    console.warn('   Falling back to manual JSON export...\n');

    // ── Manual Fallback: paste the data directly here ────────────────────
    // Copy the STATIC_SHLOKA_CATEGORIES_DATA object from shlokaService.ts
    // and assign it below (with image: null replaced).
    console.error(`
❌ Could not auto-export from TypeScript.

Please do ONE of these:
  1. Install ts-node:  npm install -D ts-node
     Then re-run:       node scripts/exportShlokaData.js

  2. OR manually copy the STATIC_SHLOKA_CATEGORIES_DATA from:
       src/services/firebaseServices/shlokaService.ts
     Replace all  image: imagePath.Xxx  with  imageUrl: null
     Save as:  scripts/shlokaData.json
`);
    process.exit(1);
  }

  // Print summary
  const cats = Object.keys(rawData);
  console.log(`\n📊 Export Summary`);
  console.log(`${'─'.repeat(50)}`);
  for (const slug of cats) {
    const cat = rawData[slug];
    const items = cat.items || [];
    let verseCount = 0;
    items.forEach(i => { verseCount += (i.verses || []).length; });
    console.log(`  ${slug.padEnd(30)} ${items.length} sub-cats | ${verseCount} verses`);
  }
  console.log(`${'─'.repeat(50)}`);
  console.log(`\n✅ Written to: ${OUTPUT_PATH}`);
  console.log(`\nNext step: node scripts/uploadShlokas.js --dry-run`);
}

main().catch(err => {
  console.error('❌ Export failed:', err.message);
  process.exit(1);
});
